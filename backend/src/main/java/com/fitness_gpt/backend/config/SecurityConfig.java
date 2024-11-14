package com.fitness_gpt.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration //Marks this class as a configuration class
@EnableWebSecurity //Define all rules related to web security, such as which URLs need to be verified and how to verify them.
public class SecurityConfig {
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults()) //Enables CORS with default settings.
                .csrf(csrf -> csrf.disable())//Disables CSRF (Cross-Site Request Forgery夸站点请求伪造) protection.
                .authorizeRequests(auth -> auth //Configures access rules for different endpoints.
                        .requestMatchers("/auth/register", "/auth/login").permitAll()//Allows anyone to access these two endpoints
                        .requestMatchers("/auth/user-info").authenticated()//Requires authentication for accessing.
                        .requestMatchers("/auth/download-image/**").permitAll()
                        .requestMatchers("/conversations/**").authenticated()//Requires authentication for any endpoint under /conversations/**
                        .anyRequest().authenticated()//Requires authentication for any other request not specifically mentioned.
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        //Configures the application to be stateless, meaning it won't keep track of user sessions.
        //Instead, it relies on the JWT token for authentication on each request.
        //The JWT is stored on the client and sent with each request, enabling the server to remain stateless.
        //The server only needs to decode and validate the token without tracking sessions, which is why stateless authentication scales well across distributed systems.
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        //To ensure JWTs are checked before any username/password-based authentication.
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }//To encrypt user password
    //When a user registers or changes their password, BCryptPasswordEncoder will encrypt the original password to generate a hashed password.
    //When the user logs in, the password they enter is encrypted using BCryptPasswordEncoder and then compared to the hashed password in the database.
}

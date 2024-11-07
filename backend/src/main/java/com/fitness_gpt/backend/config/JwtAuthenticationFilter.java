package com.fitness_gpt.backend.config;

import com.fitness_gpt.backend.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    //To verify that the JWT of each request is valid and set the user identity information into the Spring Security context.
    //Inherited from OncePerRequestFilter. This class ensures that each request is filtered only once, avoiding duplicate filtering
    @Autowired
    private JwtUtil jwtUtil;//Contains methods for generating, parsing and validating JWTs

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");//Get the Authorization field in the request header.
        String token = null;
        String email = null;//To store the extracted JWT and user's email.

        if (authHeader != null && authHeader.startsWith("Bearer ")) {//Determine whether the request header exists and starts with "Bearer
            token = authHeader.substring(7);//Get the actual JWT, removing the prefix.
            email = jwtUtil.getUserIdFromToken(token);//To extract the user identifier from the JWT
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {//If email was extracted and there is no authenticated user in the current context.
            if (jwtUtil.validateToken(token)) {//Validating the JWT is valid
                UsernamePasswordAuthenticationToken authentication = //UsernamePasswordAuthenticationToken is the object Spring Security uses for authentication and contains user information
                        new UsernamePasswordAuthenticationToken(email, null, null);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);//Set the authentication information into the SecurityContext, indicating that the request has been authenticated.
            }
        }
        chain.doFilter(request, response);//Continue processing the filter chain to ensure that the request continues to be passed back for subsequent filtering or processing.
    }
}

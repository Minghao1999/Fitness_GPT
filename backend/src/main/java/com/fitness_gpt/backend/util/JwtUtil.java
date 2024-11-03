package com.fitness_gpt.backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateToken(String userId) {//Generate a JWT containing userId and set the validity period and signature.
        return Jwts.builder()
                .setSubject(userId)//Set the body of the JWT(the sub field) to userId, indicating that the token is generated for this user.
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))//Set the token expiration time, here is the current time plus 10 hours.
                .signWith(SECRET_KEY)
                .compact();// Generate the final JWT token.
    }

    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

    public String getUserIdFromToken(String token) {
        return getClaims(token).getSubject();
    }

    private Boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();
    }
}

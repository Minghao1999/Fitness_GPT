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

    // 生成 JWT
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 设置过期时间
                .signWith(SECRET_KEY)
                .compact();
    }

    // 验证 JWT
    public Boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

    // 从 JWT 中提取 email
    public String getEmailFromToken(String token) {
        return getClaims(token).getSubject();
    }

    // 检查 JWT 是否已过期
    private Boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    // 获取 Claims
    private Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();
    }
}

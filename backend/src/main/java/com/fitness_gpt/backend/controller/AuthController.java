package com.fitness_gpt.backend.controller;

import com.fitness_gpt.backend.model.User;
import com.fitness_gpt.backend.service.UserService;
import com.fitness_gpt.backend.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User register(@Valid @RequestBody User user) {
        return userService.registerUser(
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                user.getPhone()
                );
    }

    @PostMapping("/login")
    public String  login(@RequestBody User user) {
        try {
            return userService.loginUser(user.getEmail(), user.getPassword());
        } catch (Exception e) {
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }

    @GetMapping("/user-info")
    public User getUserInfo(@RequestHeader("Authorization") String token) {
        String actualToken = token.replace("Bearer ", "");

        String email = jwtUtil.getEmailFromToken(actualToken);

        return userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid token"));
    }
}

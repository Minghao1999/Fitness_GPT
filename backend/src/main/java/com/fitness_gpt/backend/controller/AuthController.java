package com.fitness_gpt.backend.controller;

import com.fitness_gpt.backend.model.User;
import com.fitness_gpt.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                user.getPhone()
                );
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        try {
            return userService.loginUser(user.getUsername(), user.getPassword());
        } catch (Exception e) {
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }
}

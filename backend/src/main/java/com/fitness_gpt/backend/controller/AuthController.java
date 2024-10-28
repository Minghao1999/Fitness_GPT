package com.fitness_gpt.backend.controller;

import com.fitness_gpt.backend.model.User;
import com.fitness_gpt.backend.service.UserService;
import com.fitness_gpt.backend.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    @CrossOrigin(origins = "http://localhost:5173")

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

    @PatchMapping("/update-info")
    public User updateUserInfo(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> updates) {
        String actualToken = token.replace("Bearer ", "");
        String email = jwtUtil.getEmailFromToken(actualToken);

        String gender = updates.get("gender") != null ? updates.get("gender").toString() : null;
        String age = updates.get("age") != null ? updates.get("age").toString() : null;
        String phone = updates.get("phone") != null ? updates.get("phone").toString() : null;
        String username = updates.get("username") != null ? updates.get("username").toString() : null;
        String height = updates.get("height") != null ? updates.get("height").toString() : null;
        String weight = updates.get("weight") != null ? updates.get("weight").toString() : null;

        try{
            return userService.updateUserInfo(email, username, phone, gender, height, weight, age);
        }catch (Exception e){
            throw new RuntimeException("Invalid token: " + e.getMessage());
        }
    }
}

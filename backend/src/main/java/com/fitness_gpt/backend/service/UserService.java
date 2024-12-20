package com.fitness_gpt.backend.service;

import com.fitness_gpt.backend.model.User;
import com.fitness_gpt.backend.repository.UserRepository;
import com.fitness_gpt.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public User registerUser(String username, String password, String email, String phone) {
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setEmail(email);
        user.setPhone(phone);
        return userRepository.save(user);
    }

    public String loginUser(String email, String password) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

        if (passwordEncoder.matches(password, user.getPassword())) {
            return jwtUtil.generateToken(user.getId());
        } else {
            throw new Exception("Invalid credentials");
        }
    }

    public Optional<User> getUserById(String userId) {
        return userRepository.findById(userId);
    }

    public User updateUserInfo(String userId, String email, String username, String phone, String gender, String height, String weight, String age) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));

        if (phone != null) {
            user.setPhone(phone);
        }
        if (email != null) {
            user.setEmail(email);
        }
        if (gender != null) {
            user.setGender(gender);
        }
        if (height != null) {
            user.setHeight(height);
        }
        if (weight != null) {
            user.setWeight(weight);
        }
        if (age != null) {
            user.setAge(age);
        }
        if (username != null) {
            user.setUsername(username);
        }

        return userRepository.save(user);
    }
}



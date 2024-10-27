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
            return jwtUtil.generateToken(user.getEmail());
        } else {
            throw new Exception("Invalid credentials");
        }
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}

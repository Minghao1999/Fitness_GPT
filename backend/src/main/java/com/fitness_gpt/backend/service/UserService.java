package com.fitness_gpt.backend.service;

import com.fitness_gpt.backend.model.User;
import com.fitness_gpt.backend.repository.UserRepository;
import com.fitness_gpt.backend.util.JwtUtil;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.GridFSUploadStream;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private MongoDatabase mongoDatabase;

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

    public User updateUser(User user) {
        return userRepository.save(user);
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

    public ObjectId uploadUserImage(String userId, MultipartFile file) throws Exception {
        GridFSBucket gridFSBucket = GridFSBuckets.create(mongoDatabase, "userImages");

        GridFSUploadOptions options = new GridFSUploadOptions().chunkSizeBytes(358400);
        try (GridFSUploadStream uploadStream = gridFSBucket.openUploadStream(file.getOriginalFilename(), options)) {
            uploadStream.write(file.getBytes());
            return uploadStream.getObjectId();
        }
    }
}



package com.fitness_gpt.backend.controller;

import com.fitness_gpt.backend.model.User;
import com.fitness_gpt.backend.service.UserService;
import com.fitness_gpt.backend.util.JwtUtil;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.GridFSDownloadStream;
import jakarta.validation.Valid;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private MongoDatabase mongoDatabase;

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

        String userId = jwtUtil.getUserIdFromToken(actualToken);

        return userService.getUserById(userId)
                .orElseThrow(() -> new RuntimeException("Invalid token"));
    }

    @PatchMapping("/update-info")
    public User updateUserInfo(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> updates) {
        String actualToken = token.replace("Bearer ", "");
        String userId = jwtUtil.getUserIdFromToken(actualToken);

        String gender = updates.get("gender") != null ? updates.get("gender").toString() : null;
        String email = updates.get("email") != null ? updates.get("email").toString() : null;
        String age = updates.get("age") != null ? updates.get("age").toString() : null;
        String phone = updates.get("phone") != null ? updates.get("phone").toString() : null;
        String username = updates.get("username") != null ? updates.get("username").toString() : null;
        String height = updates.get("height") != null ? updates.get("height").toString() : null;
        String weight = updates.get("weight") != null ? updates.get("weight").toString() : null;

        try{
            return userService.updateUserInfo(userId, email, username, phone, gender, height, weight, age);
        }catch (Exception e){
            throw new RuntimeException("Invalid token: " + e.getMessage());
        }
    }

    @PostMapping("/upload-image")
    public String uploadImage(@RequestHeader("Authorization") String token, @RequestParam("file") MultipartFile file) {
        try{
            String actualToken = token.replace("Bearer ", "");
            String userId = jwtUtil.getUserIdFromToken(actualToken);

            ObjectId imageId = userService.uploadUserImage(userId, file);

            Optional<User> optionalUser = userService.getUserById(userId);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                user.setImageId(imageId.toHexString());
                userService.updateUser(user);
            }

            return "Image uploaded successfully with ID: " + imageId.toHexString();
        }catch (Exception e){
            throw new RuntimeException("Image upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/download-image/{id}")
    public ResponseEntity<byte[]> downloadImage(@PathVariable("id") String id) {
        GridFSBucket gridFSBucket = GridFSBuckets.create(mongoDatabase, "userImages");

        GridFSDownloadStream downloadStream = gridFSBucket.openDownloadStream(new ObjectId(id));
        int fileLength = (int) downloadStream.getGridFSFile().getLength();
        byte[] fileData = new byte[fileLength];
        downloadStream.read(fileData);
        downloadStream.close();

        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(fileData);
    }
}
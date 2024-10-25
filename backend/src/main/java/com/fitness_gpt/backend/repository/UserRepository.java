package com.fitness_gpt.backend.repository;

import com.fitness_gpt.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String>{
    Optional<User> findByUsername(String username);
}
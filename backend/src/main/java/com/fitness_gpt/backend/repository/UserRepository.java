package com.fitness_gpt.backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.fitness_gpt.backend.model.User;

public interface UserRepository extends MongoRepository<User, String>{
    Optional<User> findByEmail(String Email);
}
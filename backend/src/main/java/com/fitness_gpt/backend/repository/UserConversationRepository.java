package com.fitness_gpt.backend.repository;

import com.fitness_gpt.backend.model.UserConversation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserConversationRepository extends MongoRepository<UserConversation, String> {
    List<UserConversation> findByUserId(String userId);
}

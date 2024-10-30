package com.fitness_gpt.backend.service;

import com.fitness_gpt.backend.model.UserConversation;
import com.fitness_gpt.backend.repository.UserConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserConversationService {
    @Autowired
    private UserConversationRepository userConversationRepository;

    public UserConversation startConversation(String userId) {
        UserConversation userConversation = new UserConversation();
        userConversation.setUserId(userId);
        userConversation.setSessionStart(LocalDateTime.now());
        return userConversationRepository.save(userConversation);
    }

    public List<UserConversation> getAllConversations(String userId) {
        return userConversationRepository.findByUserId(userId);
    }

    public UserConversation addMessageToConversation(String conversationId, UserConversation.Message message) {
        UserConversation conversation = userConversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
        conversation.getMessages().add(message);
        return userConversationRepository.save(conversation);
    }
}

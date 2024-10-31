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

    @Autowired
    private GPTService gptService;

    public UserConversation startConversation(String userId) {
        UserConversation userConversation = new UserConversation();
        userConversation.setUserId(userId);
        userConversation.setSessionStart(LocalDateTime.now());
        return userConversationRepository.save(userConversation);
    }

    public List<UserConversation> getAllConversations(String userId) {
        return userConversationRepository.findByUserId(userId);
    }

    public UserConversation addMessageToConversation(String conversationId, UserConversation.Message userMessage) {
        UserConversation conversation = userConversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        conversation.getMessages().add(userMessage);

        String gptResponseContent = gptService.getGptResponse(userMessage.getContent());

        UserConversation.Message gptMessage = new UserConversation.Message();
        gptMessage.setSender("bot");
        gptMessage.setContent(gptResponseContent);
        gptMessage.setTimestamp(LocalDateTime.now());

        conversation.getMessages().add(gptMessage);

        return userConversationRepository.save(conversation);
    }

}

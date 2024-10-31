package com.fitness_gpt.backend.controller;

import com.fitness_gpt.backend.model.UserConversation;
import com.fitness_gpt.backend.service.UserConversationService;
import com.fitness_gpt.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/conversations")
public class ConversationController {
    @Autowired
    private UserConversationService userConversationService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/start")
    public UserConversation startConversation(@RequestHeader("Authorization") String token) {
        String actualToken = token.replace("Bearer ", "");
        String userId = jwtUtil.getUserIdFromToken(actualToken);
        return userConversationService.startConversation(userId);
    }

    @GetMapping("/get-message/{conversationId}")
    public List<UserConversation> getAllConversations(@RequestHeader("Authorization") String token) {
        String actualToken = token.replace("Bearer ", "");
        String userId = jwtUtil.getUserIdFromToken(actualToken);
        return userConversationService.getAllConversations(userId);
    }

    @PostMapping("/add-message/{conversationId}")
    public UserConversation addMessageToConversation(@PathVariable String conversationId, @RequestBody UserConversation.Message message) {
        return userConversationService.addMessageToConversation(conversationId, message);
    }
}

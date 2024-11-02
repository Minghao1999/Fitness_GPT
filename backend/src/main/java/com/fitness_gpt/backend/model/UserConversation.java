package com.fitness_gpt.backend.model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "user_conversations")
public class UserConversation {

    @Id
    @Getter @Setter
    private String id;

    @Setter
    @Getter
    private String userId;

    @Setter
    @Getter
    private LocalDateTime sessionStart;

    @Setter
    @Getter
    private List<Message> messages = new ArrayList<>();

    @Setter
    @Getter
    public static class Message{
        private String sender;

        private String content;

        private LocalDateTime timestamp;
    }
}

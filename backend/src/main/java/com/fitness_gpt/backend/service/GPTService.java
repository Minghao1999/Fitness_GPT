package com.fitness_gpt.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;


@Service
public class GPTService {
    private final ObjectMapper jacksonObjectMapper;
    @Value("${gpt.api.key}")
    private String apiKey;

    public GPTService(ObjectMapper jacksonObjectMapper) {
        this.jacksonObjectMapper = jacksonObjectMapper;
    }

    public String getGptResponse(String question) {
        String apiUrl = "https://api.openai.com/v1/chat/completions";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        String requestBody = String.format(
                "{\"model\": \"gpt-3.5-turbo\", \"messages\": [{\"role\": \"user\", \"content\": \"%s\"}], \"max_tokens\": 50}",
                question);
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, entity, String.class);

        try{
            JsonNode root = jacksonObjectMapper.readTree(response.getBody());
            return root.path("choices").get(0).path("message").path("content").asText();
        }catch (Exception e){
            e.printStackTrace();
            return "Error parsing response";
        }
    }
}

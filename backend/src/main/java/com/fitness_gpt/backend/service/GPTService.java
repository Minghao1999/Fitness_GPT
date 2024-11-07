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
    private final ObjectMapper jacksonObjectMapper;//ObjectMapper: To convert a JSON string to a java object or generate a JSON string from a Java object.
    @Value("${gpt.api.key}")
    private String apiKey;

    public GPTService(ObjectMapper jacksonObjectMapper) {
        this.jacksonObjectMapper = jacksonObjectMapper;
    }//Initialize the jacksonObjectMapper object.

    public String getGptResponse(String question) { //send a request to OpenAI model and returns the response it generates.
        String apiUrl = "https://api.openai.com/v1/chat/completions";
        RestTemplate restTemplate = new RestTemplate();//To send HTTP requests.

        HttpHeaders headers = new HttpHeaders();//Create an HttpHeaders instance to set request headers.
        headers.set("Authorization", "Bearer " + apiKey);// Set authorization head, use Bearer token validation.
        headers.set("Content-Type", "application/json");//Specify the request body format as "application/json"

        String systemContext = """
        {
            "role": "system",
            "content": "You are an assistant whose knowledge is limited to the general knowledge about fitness."
        }
    """;

        String requestBody = String.format(
                "{\"model\": \"gpt-3.5-turbo\", \"messages\": [%s, {\"role\": \"user\", \"content\": \"%s\"}]}",
                systemContext, question);//Constructing the request body format. max_tokens set a limit on the length of generated replies.
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);//Encapsulate the request body and request header into HttpEntity.

        ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, entity, String.class);
        //sends a POST request to the OpenAI API and returns a ResponseEntity response object.
        try{
            JsonNode root = jacksonObjectMapper.readTree(response.getBody());//Parse the JSON response into a JsonNode to extract fields.
            return root.path("choices").get(0).path("message").path("content").asText();// Extract choices[0].message.content from the JSON structure, which is the response content of GPT-3.5
        }catch (Exception e){
            e.printStackTrace();
            return "Error parsing response";
        }
    }
}

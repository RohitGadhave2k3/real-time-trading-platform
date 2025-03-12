package com.tradingplatform.service;

import com.tradingplatform.config.ApiConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GeminiAIService {

    private final ApiConfig apiConfig;
    private final RestTemplate restTemplate;
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    public String generateContent(String prompt) {
        String url = GEMINI_API_URL + "?key=" + apiConfig.getGeminiApiKey();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> content = new HashMap<>();
        Map<String, Object> textPart = new HashMap<>();
        textPart.put("text", prompt);
        
        Map<String, Object> part = new HashMap<>();
        part.put("parts", List.of(textPart));
        
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(part));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            return restTemplate.postForObject(url, request, String.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate content from Gemini AI: " + e.getMessage());
        }
    }
} 
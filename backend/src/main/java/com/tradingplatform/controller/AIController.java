package com.tradingplatform.controller;

import com.tradingplatform.service.GeminiAIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AIController {

    private final GeminiAIService geminiAIService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateContent(@RequestBody String prompt) {
        try {
            String response = geminiAIService.generateContent(prompt);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 
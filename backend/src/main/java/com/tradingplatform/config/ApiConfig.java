package com.tradingplatform.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiConfig {
    
    @Value("${api.gemini.key}")
    private String geminiApiKey;
    
    @Value("${api.gemini.secret:#{null}}")
    private String geminiApiSecret;
    
    public String getGeminiApiKey() {
        return geminiApiKey;
    }
    
    public String getGeminiApiSecret() {
        return geminiApiSecret;
    }
} 
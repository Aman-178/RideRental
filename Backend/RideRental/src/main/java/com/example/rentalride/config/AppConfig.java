package com.example.rentalride.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class AppConfig {

    @Bean
    RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean

   ObjectMapper objectMapper() {
        return new ObjectMapper();
    }
}
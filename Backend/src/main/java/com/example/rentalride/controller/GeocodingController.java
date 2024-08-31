package com.example.rentalride.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class GeocodingController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;
    @GetMapping("/getLocation")
    public ResponseEntity<String> getLocation(@RequestParam("latitude") String latitude,
                                              @RequestParam("longitude") String longitude) {
        // Construct the URL for the Nominatim API request
        String url = String.format(
            "https://nominatim.openstreetmap.org/reverse?lat=%s&lon=%s&format=json&addressdetails=1",
            latitude, longitude);

        // Create HttpHeaders and set User-Agent
        HttpHeaders headers = new HttpHeaders();
        headers.set("Aman", "RideRental (amanjmu1999@gmail.com)");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Make the API request
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        String response = responseEntity.getBody();

        if (response != null) {
            try {
                // Parse the JSON response to extract the address
                JsonNode rootNode = objectMapper.readTree(response);
                String address = rootNode.path("display_name").asText();

                if (!address.isEmpty()) {
                    return ResponseEntity.ok(address);
                } else {
                    return ResponseEntity.status(404).body("Address not found");
                }
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Error parsing response: " + e.getMessage());
            }
        } else {
            return ResponseEntity.status(500).body("Failed to retrieve address");
        }
    }
}

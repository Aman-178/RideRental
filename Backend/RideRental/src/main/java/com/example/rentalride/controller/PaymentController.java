package com.example.rentalride.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

@RestController
@RequestMapping("/paymentverification")
public class PaymentController {

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> verifyPayment(@RequestBody @Valid Payment payment) {
        // TODO: Add your payment processing logic here

        // Example of returning a success message
        return ResponseEntity.status(HttpStatus.OK).body("Payment verified successfully!");
    }
}

// Payment request DTO
class Payment {
    @NotBlank
    private String cardName;
    
    @NotBlank
    private String cardNumber;
    
    @NotBlank
    private String expiryDate;
        
    @NotBlank
    private String cvv;
    
    @NotBlank
    private String billingAddress;
    
    private String upiId;

    // Getters and setters
    public String getCardName() {
        return cardName;
    }

    public void setCardName(String cardName) {
        this.cardName = cardName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public String getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }

    public String getUpiId() {
        return upiId;
    }

    public void setUpiId(String upiId) {
        this.upiId = upiId;
    }
}

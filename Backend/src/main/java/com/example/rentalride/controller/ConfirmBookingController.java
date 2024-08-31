package com.example.rentalride.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rentalride.dao.ConfirmBookingRepository;
import com.example.rentalride.entities.ConfirmBooking;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/confirmbookingdata")
public class ConfirmBookingController {
  
	@Autowired
	private ConfirmBookingRepository repository;
	
	
	
}

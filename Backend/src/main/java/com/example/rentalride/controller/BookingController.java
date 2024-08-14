package com.example.rentalride.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.rentalride.dao.BookingRepository;
import com.example.rentalride.entities.Booking;
import com.example.rentalride.entities.Supplier;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/bookingdata")

public class BookingController {
	 private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	@Autowired
	private BookingRepository repository;
	
	@PostMapping("/userbook")
	@CrossOrigin(origins="http://localhost:3000")
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            if (booking != null) {
                
            	repository.save(booking);
                return new ResponseEntity<>(HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
            }
        } catch (Exception ex) {
            logger.error("Error during booking creation", ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	@GetMapping()
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<List<Booking>> getBookingOrder(@RequestParam("supplierid") Long supplierid) {
	    
	    try {
	        List<Booking> orders = repository.findBysupplierid(supplierid);
	        
	        if (orders != null && !orders.isEmpty()) {
	            return new ResponseEntity<>(orders, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    } catch (Exception e) {
	        logger.error("Error retrieving supplier data", e);
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }


	}
	
	
}

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
import org.springframework.web.bind.annotation.PutMapping;
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
                return new ResponseEntity<>(booking,  HttpStatus.CREATED);
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
	
	@PutMapping("/updateStatus")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<?> updateStatus(
	        @RequestParam("id") Long id,
	        @RequestParam("status") String status) {
	    try {
	        Optional<Booking> orderStatus = repository.findById(id);

	        if (orderStatus.isPresent()) {
	            Booking orderData = orderStatus.get();
	            
	            // Set the new status
	            orderData.setStatus(status);
	            
	            // Save the updated order
	            repository.save(orderData);
	            
	            return new ResponseEntity<>(HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    } catch (Exception ex) {
	        logger.error("Error in updating data", ex);
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	
	@GetMapping("/statusbooking")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<String> statusbooking(@RequestParam("id") Long id) {
	    final String Acceptstatus = "Accept";
	    final String DeclineStatus = "Decline";
	      
	    try {
	        Optional<Booking> statusUpdate = repository.findById(id);
	        if (statusUpdate.isPresent()) {
	            Booking updateStatus = statusUpdate.get();
	            
	            String status = updateStatus.getStatus();
	       
	            if (Acceptstatus.equals(status)) {
	                return new ResponseEntity<>(Acceptstatus, HttpStatus.OK);
	            } else if (DeclineStatus.equals(status)) {
	                return new ResponseEntity<>(DeclineStatus, HttpStatus.OK);
	            } else {
	                return new ResponseEntity<>("Wait", HttpStatus.OK);
	            }
	        } else {
	            //  Booking with the given ID not found
	            return new ResponseEntity<>("Booking not found", HttpStatus.NOT_FOUND);
	            
	        }
	    } catch (Exception ex) {
	        logger.error("Error in fetching booking status", ex);
	        return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}


	
	
	
	
	
}

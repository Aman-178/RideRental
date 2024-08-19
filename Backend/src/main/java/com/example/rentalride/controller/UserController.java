package com.example.rentalride.controller;


import java.util.List;
import java.util.Optional;

import javax.net.ssl.SSLEngineResult.Status;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.rentalride.dao.UserRepository;
import com.example.rentalride.entities.User;



@RestController
@RequestMapping("/userdata")

public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserRepository repository;
    
    @PostMapping("/userlogin")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> loginUser(@RequestBody User loginUser) {
        logger.info("Login attempt for email: {}", loginUser.getEmail());
        try {
        	
            // Validate request
            if (loginUser.getEmail() == null || loginUser.getPassword() == null) {
                return new ResponseEntity<>("Email and Password are required", HttpStatus.BAD_REQUEST);
            }

            // Find user by email
            User user = repository.findUserByEmail(loginUser.getEmail()).orElse(null);
            if (user == null) {
                return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
            }

            // Directly compare passwords (assuming stored passwords are in plain text)
            if (loginUser.getPassword().equals(user.getPassword())) {
                // If email and password match
                return new ResponseEntity<>(user.getId(),HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            logger.error("Error during login", ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    
    
    @PostMapping("/usersignup")
    @CrossOrigin(origins ="http://localhost:3000")
    public ResponseEntity<?> createUser( @RequestBody User user) {
        try {
            // Check if user email already exists
            if (user.getEmail() == null || user.getEmail().isEmpty()) {
                return new ResponseEntity<>("Email cannot be null or empty", HttpStatus.BAD_REQUEST);
            }
            if (repository.findUserByEmail(user.getEmail()).isPresent()) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            
            // Check if user mobile number already exists
            if (user.getMobno() == null || user.getMobno().isEmpty()) {
                return new ResponseEntity<>("Mobile number cannot be null or empty", HttpStatus.BAD_REQUEST);
            }
            if (repository.findUserByMobno(user.getMobno()).isPresent()) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            
            // Save the user if email and mobile number are unique
            repository.save(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception ex) {
            logger.error("Error saving user", ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }   
    
    
   
   @GetMapping("/userprofiledata")
   @CrossOrigin(origins="http://localhost:3000")
   public ResponseEntity<User>getuser(@RequestParam("id")Long id){
	   
	   try {
		   Optional<User>checkuser=repository.findById(id);
		   if(checkuser.isPresent()) {
			 
			  return new ResponseEntity<>(checkuser.get(), HttpStatus.OK);
		   }else {
			   return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		   }
	   }catch(Exception ex) {
		   
		   logger.error("Error saving user", ex);
		   return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	   }
   }
   
   @PutMapping("/updateuser")
   @CrossOrigin(origins="http://localhost:3000")
   public ResponseEntity<?>updateuser(@RequestBody User user){
	    try {
	    	Optional<User>checkUserUpdate=repository.findById(user.getId());
	    	if(checkUserUpdate.isPresent()) {
	    		User existinguser=checkUserUpdate.get();
	    		existinguser.setEmail(user.getEmail());
	    		existinguser.setFullname(user.getFullname());
	    		existinguser.setMobno(user.getMobno());
	    		repository.save(existinguser);
	    		
	    		return new ResponseEntity<>(HttpStatus.OK);
	    	}else {
	    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    	}
	    }catch(Exception ex) {
	    	logger.error("Error saving user", ex);
	    	return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	    
   }
    
}

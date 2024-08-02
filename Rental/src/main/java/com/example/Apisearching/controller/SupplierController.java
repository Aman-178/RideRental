package com.example.Apisearching.controller;


import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Apisearching.Dao.ShopSupplier;
import com.example.Apisearching.entity.Supplier;


@RestController
@RequestMapping("/supplier")
public class SupplierController {
	 private static final Logger logger = LoggerFactory.getLogger(SupplierController.class);

	  @Autowired
	  private ShopSupplier repository;
	  
	  
	  
	  //Function create For user Save!.
	  @PostMapping
	  @CrossOrigin(origins = "http://localhost:3000")
	   public ResponseEntity<?>CreateSupplier(@RequestBody Supplier supplier){
				  if (supplier == null) {
			           
			            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			        }
				 
				  if(repository.findByEmail(supplier.getEmail()).isPresent()) {
			    		return new ResponseEntity<>("This email already exists",HttpStatus.CONFLICT);
			    	}
				  if(repository.findByMobileno(supplier.getMobno()).isPresent()) {
			    		return new ResponseEntity<>("This MobileNo already exists",HttpStatus.CONFLICT);
			    	}
				  try {
					  
					   Supplier usersave= repository.save(supplier);
				       return new ResponseEntity<>("Data inserted",HttpStatus.CREATED);
					  
				  }catch(Exception ex) {
					  logger.error("Error saving product", ex);
		
			            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
				  }	
				  
				  
        }
	  
	  
	  
	  
}

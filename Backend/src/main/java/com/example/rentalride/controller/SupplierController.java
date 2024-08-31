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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.example.rentalride.dao.ShopSupplier;
import com.example.rentalride.entities.Supplier;

@RestController
@RequestMapping("/supplier")
public class SupplierController {
    
    private static final Logger logger = LoggerFactory.getLogger(SupplierController.class);

    @Autowired
    private ShopSupplier repository;

    // Function to create and save a supplier
    @PostMapping("/createSupplier")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> createSupplier(
            @RequestParam("name") String name,
            @RequestParam("address") String address,
            @RequestParam("mobno") String mobno,
            @RequestParam("shopname") String shopname,
            @RequestParam("email") String email,
            @RequestParam("image") MultipartFile image,
            @RequestParam("confirmpassword") String confirmpassword){

        if (name == null || email == null || mobno == null || image == null) {
            return new ResponseEntity<>("All supplier data and image are required", HttpStatus.BAD_REQUEST);
        }

        if (repository.findByEmail(email).isPresent()) {
            return new ResponseEntity<>("This email already exists", HttpStatus.CONFLICT);
        }

        if (repository.findByMobno(mobno).isPresent()) {
            return new ResponseEntity<>("This mobile number already exists", HttpStatus.CONFLICT);
        }

        try {
            // Convert image to byte array
            byte[] imageBytes = image.getBytes();

            // Create and save the supplier entity
            Supplier supplier = new Supplier();
            supplier.setName(name);
            supplier.setAddress(address);
            supplier.setMobno(mobno);
            supplier.setShopname(shopname);
            supplier.setEmail(email);
            supplier.setImage(imageBytes); 
            supplier.setConfirmpassword(confirmpassword);
            repository.save(supplier);
            return new ResponseEntity<>("Supplier created successfully", HttpStatus.CREATED);
        } catch (Exception ex) {
            logger.error("Error saving supplier", ex);
            return new ResponseEntity<>("An error occurred while saving the supplier", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    

    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable Long id) {
        try {
            Optional<Supplier> supplierOptional = repository.findById(id);

            if (supplierOptional.isPresent()) {
                return new ResponseEntity<>(supplierOptional.get(), HttpStatus.OK); // Successful retrieval
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Supplier not found
            }
        } catch (Exception e) {
            logger.error("Error retrieving supplier data", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Error during retrieval
        }
    }

    @PutMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> updateSupplier(@RequestBody Supplier updateSupplier) {
        Optional<Supplier> existingSupplierOpt = repository.findById(updateSupplier.getId());

        if (existingSupplierOpt.isPresent()) {
            Supplier existingSupplier = existingSupplierOpt.get(); // Get the existing supplier

            existingSupplier.setAddress(updateSupplier.getAddress());
            existingSupplier.setEmail(updateSupplier.getEmail());
            existingSupplier.setMobno(updateSupplier.getMobno());
            existingSupplier.setName(updateSupplier.getName());
            existingSupplier.setShopname(updateSupplier.getShopname());
            // Set other fields as needed

            repository.save(existingSupplier); // Save the updated supplier

            return ResponseEntity.ok(existingSupplier);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Supplier not found");
        }
    }
    
    
    @PostMapping("/supplierverifydata")
    @CrossOrigin(origins="http://localhost:3000")
    public ResponseEntity<?> supplierVerify(@RequestBody Supplier loginsupplier) {
        try {
            // Validate the input
            if (loginsupplier.getEmail() == null || loginsupplier.getConfirmpassword() == null) {
                return new ResponseEntity<>("Email and Password are required", HttpStatus.BAD_REQUEST);
            }

            // Find the supplier by email
            Supplier oldsupplier = repository.findByEmail(loginsupplier.getEmail()).orElse(null);
            if (oldsupplier == null) {
                return new ResponseEntity<>("Supplier not found", HttpStatus.NOT_FOUND);
            }

            // Verify the password
            if (oldsupplier.getConfirmpassword().equals(loginsupplier.getConfirmpassword())) {
                // Password is correct, return the supplier ID and success status
                return ResponseEntity.ok(new SupplierResponse(oldsupplier.getId(), "Login successful"));
            } else {
                // Password is incorrect
                return new ResponseEntity<>("Incorrect password", HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            // Log the error and return an internal server error
            logger.error("Error retrieving suppliers", ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Response DTO class to send supplier ID and message
    static class SupplierResponse {
        private Long id;
        private String message;

        public SupplierResponse(Long id, String message) {
            this.id = id;
            this.message = message;
        }

        public Long getId() {
            return id;
        }

        public String getMessage() {
            return message;
        }
    }
    
    
    
    
    
    
    
    
    
}

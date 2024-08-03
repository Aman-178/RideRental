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

    // Get all suppliers
    @GetMapping("/allsupplyierdata..data")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Supplier>> getAllSuppliers() {
        try {
            List<Supplier> suppliers = repository.findAll();
            return new ResponseEntity<>(suppliers, HttpStatus.OK); // Successful retrieval
        } catch (Exception e) {
            logger.error("Error retrieving suppliers", e);
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
}

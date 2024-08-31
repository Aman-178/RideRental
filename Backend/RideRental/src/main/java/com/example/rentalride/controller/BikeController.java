package com.example.rentalride.controller;

import com.example.rentalride.dao.BikeSupplier;
import com.example.rentalride.dao.ShopSupplier;
import com.example.rentalride.entities.Bike;
import com.example.rentalride.entities.Supplier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bike")
public class BikeController {

    @Autowired
    private BikeSupplier bikeRepository;
    private final ShopSupplier supplierRepository; // Repository to access Supplier

    private static final Logger logger = LoggerFactory.getLogger(BikeController.class);

    BikeController(ShopSupplier supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> addBike(
            @RequestParam("supplierId") Long supplierId, // Added supplierId parameter
            @RequestParam("bikeName") String bikeName,
            @RequestParam("bikeNumber") String bikeNumber,
            @RequestParam("bikeModel") String bikeModel,
            @RequestParam("bikeBrand") String bikeBrand,
            @RequestParam("bikeColor") String bikeColor,
            @RequestParam("price") int price,
            @RequestParam("bikeType") String bikeType,
            @RequestParam("bikeCondition") String bikeCondition,
            @RequestParam("quantity") int quantity,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image) {

        if (bikeRepository.findByBikeNumber(bikeNumber).isPresent()) {
            return new ResponseEntity<>("This Bike Number already exists", HttpStatus.CONFLICT);
        }

        try {
            // Find the supplier
            Supplier supplier = supplierRepository.findById(supplierId)
                    .orElseThrow(() -> new RuntimeException("Supplier not found"));

            // Create a new Bike instance
            Bike bike = new Bike();
            bike.setBikeName(bikeName);
            bike.setBikeNumber(bikeNumber);
            bike.setBikeModel(bikeModel);
            bike.setBikeBrand(bikeBrand);
            bike.setBikeColor(bikeColor);
            bike.setPrice(price);
            bike.setBikeType(bikeType);
            bike.setBikeCondition(bikeCondition);
            bike.setQuantity(quantity);
            bike.setDescription(description);

            // Handle the image file
            if (image != null && !image.isEmpty()) {
                bike.setImage(image.getBytes());
            }

            // Associate the bike with the supplier
            bike.setSupplier(supplier);

            // Save bike entity
            bikeRepository.save(bike);

            logger.info("Bike successfully saved with ID: {}", bike.getId());
            return new ResponseEntity<>("Bike successfully saved", HttpStatus.CREATED);
        } catch (Exception ex) {
            logger.error("Error saving bike", ex);
            return new ResponseEntity<>("An error occurred while saving the Bike", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<List<Bike>> getData(@PathVariable Long id) {
        try {
            if (!supplierRepository.existsById(id)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            List<Bike> bikes = bikeRepository.findBySupplierId(id);
            return new ResponseEntity<>(bikes, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error retrieving bikes", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/allbike")
    @CrossOrigin(origins="https://localhost:3000")
    public ResponseEntity<List<Bike>> getallbike(){
    	try {
    		List<Bike>bikes=bikeRepository.findAll();
    		return new ResponseEntity<>(bikes, HttpStatus.OK);
    	}catch(Exception ex) {
    		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
}

package com.example.rentalride.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rentalride.entities.Bike;
import com.example.rentalride.entities.Supplier;

public interface BikeSupplier extends JpaRepository<Bike,Long>{
	Optional<Bike> findByBikeNumber(String bikeNumber);
	List<Bike> findBySupplierId(Long id);
}

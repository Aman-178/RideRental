package com.example.rentalride.dao;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rentalride.entities.Booking;

public interface BookingRepository extends JpaRepository<Booking,Long> {
	
	List<Booking> findBysupplierid(Long supplierid);
}

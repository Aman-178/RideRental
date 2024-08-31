package com.example.rentalride.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rentalride.entities.ConfirmBooking;

public interface ConfirmBookingRepository extends JpaRepository<ConfirmBooking,Long> {
    
}

package com.example.rentalride.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rentalride.entities.Supplier;

public interface ShopSupplier extends JpaRepository<Supplier, Long> {
    Optional<Supplier> findByMobno(String mobno);
    Optional<Supplier> findByEmail(String email);
}

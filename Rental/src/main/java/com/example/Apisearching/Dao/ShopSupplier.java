package com.example.Apisearching.Dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Apisearching.entity.Supplier;


public interface ShopSupplier extends JpaRepository<Supplier,Long>{

	Optional<Supplier> findByMobileno(String shopownermobileno);
	Optional<Supplier> findByEmail(String shopowneremail);
}

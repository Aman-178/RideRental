package com.example.rentalride.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rentalride.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	Optional<User> findUserByEmail(String email);
	Optional<User> findUserByMobno(String mobno);
	
}

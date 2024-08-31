package com.example.rentalride.entities;

import jakarta.persistence.*;


@Entity
public class Booking {
  
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long Id;
	 
	 private String bikename;
	 private String bikenumber;
	 private String days;
	 private String address;
	 private String orignalprice;
	 private String totalprice;
	 private String username;
	 private String mobomo;
	 private String status="Requesting";
	 private Long supplierid;
	  
     
	



	public Booking(Long id, String bikename, String bikenumber, String days, String address, String orignalprice,
			String totalprice, String username, String mobomo, String status, Long supplierid) {
		super();
		Id = id;
		this.bikename = bikename;
		this.bikenumber = bikenumber;
		this.days = days;
		this.address = address;
		this.orignalprice = orignalprice;
		this.totalprice = totalprice;
		this.username = username;
		this.mobomo = mobomo;
		this.status = status;
		this.supplierid = supplierid;
	}



	public Booking() {
		super();
		// TODO Auto-generated constructor stub
	 }


	
	public String getOrignalprice() {
		return orignalprice;
	}



	public void setOrignalprice(String orignalprice) {
		this.orignalprice = orignalprice;
	}


	public String getTotalprice() {
		return totalprice;
	}



	public void setTotalprice(String totalprice) {
		this.totalprice = totalprice;
	}



	public Long getSupplierid() {
		return supplierid;
	}



	public void setSupplierid(Long supplierid) {
		this.supplierid = supplierid;
	}



	public String getStatus() {
		return status;
	}



	public void setStatus(String status) {
		this.status = status;
	}



	public String getMobomo() {
		return mobomo;
	}


	public void setMobomo(String mobomo) {
		this.mobomo = mobomo;
	}


	public Long getId() {
		return Id;
	}


	public void setId(Long id) {
		Id = id;
	}


	public String getBikename() {
		return bikename;
	}


	public void setBikename(String bikename) {
		this.bikename = bikename;
	}


	public String getBikenumber() {
		return bikenumber;
	}


	public void setBikenumber(String bikenumber) {
		this.bikenumber = bikenumber;
	}


	public String getDays() {
		return days;
	}


	public void setDays(String days) {
		this.days = days;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}
	 
	 
	 
	 
	
}

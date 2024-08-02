package com.example.Apisearching.entity;

import jakarta.persistence.*;

@Entity
@Table(name="shopsupplier")
public class Supplier {
   
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	
	@Column(name="shopownername",nullable=false)
	private String name;
	@Column(name="shopowneraddress",nullable=false)
	private String address;
	@Column(name="shopownermobileno", nullable=false, unique=true)
    private String mobno;
	@Column(name="shopname", nullable=false)
	private String shoapname;
	@Column(name="shopowneremail", nullable=false)
    private String email;
	@Column(name="confirmpassword", nullable=false,unique=true)
    private String confirmpassword;
	
	public Supplier(Long id, String name, String address, String mobno, String shoapname, String email,
			String confirmpassword) {
		super();
		Id = id;
		this.name = name;
		this.address = address;
		this.mobno = mobno;
		this.shoapname = shoapname;
		this.email = email;
		this.confirmpassword = confirmpassword;
	}

	public Supplier() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMobno() {
		return mobno;
	}

	public void setMobno(String mobno) {
		this.mobno = mobno;
	}

	public String getShoapname() {
		return shoapname;
	}

	public void setShoapname(String shoapname) {
		this.shoapname = shoapname;
	}

	

	public void setEmail(String email) {
		this.email = email;
	}

	public String getConfirmpassword() {
		return confirmpassword;
	}

	public void setConfirmpassword(String confirmpassword) {
		this.confirmpassword = confirmpassword;
	}

	public String getEmail() {
		return null;
	}
    
	 
	
	
}

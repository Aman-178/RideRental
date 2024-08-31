package com.example.rentalride.entities;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "shopsupplier")
public class Supplier {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // changed from 'Id' to 'id' to follow Java naming conventions

    @Column(name = "shopownername", nullable = false)
    private String name;

    @Column(name = "shopowneraddress", nullable = false)
    private String address;

    @Column(name = "shopownermobileno", nullable = false, unique = true)
    private String mobno; // field name matches repository method

    @Column(name = "shopname", nullable = false)
    private String shopname; // corrected spelling

    @Column(name = "shopowneremail", nullable = false)
    private String email;
    
    @Lob
    @Column(name="myprofile",nullable=false)
    private byte[] image; 
    
    @Column(name = "confirmpassword", nullable = false)
    private String confirmpassword;

    // Constructors, getters, and setters

    public Supplier(Long id, String name, String address, String mobno, String shopname, String email,
    		byte[] image,   String confirmpassword) {
        super();
        this.id = id;
        this.name = name;
        this.address = address;
        this.mobno = mobno;
        this.shopname = shopname;
        this.email = email;
        this.image=image;
        this.confirmpassword = confirmpassword;
    }

    public Supplier() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getShopname() {
        return shopname;
    }

    public void setShopname(String shopname) {
        this.shopname = shopname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
        
	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public String getConfirmpassword() {
        return confirmpassword;
    }

    public void setConfirmpassword(String confirmpassword) {
        this.confirmpassword = confirmpassword;
    }
}

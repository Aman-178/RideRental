package com.example.rentalride.entities;

import jakarta.persistence.*;

@Entity
public class Bike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String bikeName;
    private String bikeNumber;
    private String bikeModel;
    private String bikeBrand;
    private String bikeColor;
    private int price;
    private String bikeType;
    private String bikeCondition;
    private int quantity;
    private String description;
    @Lob
    private byte[] image;

    @ManyToOne
    private Supplier supplier; // Reference to the supplier

    
    
    public Bike() {
		super();
		// TODO Auto-generated constructor stub
	}

    
	public Bike(Long id, String bikeName, String bikeNumber, String bikeModel, String bikeBrand, String bikeColor,
			int price, String bikeType, String bikeCondition, int quantity, String description, byte[] image,
			Supplier supplier) {
		super();
		this.id = id;
		this.bikeName = bikeName;
		this.bikeNumber = bikeNumber;
		this.bikeModel = bikeModel;
		this.bikeBrand = bikeBrand;
		this.bikeColor = bikeColor;
		this.price = price;
		this.bikeType = bikeType;
		this.bikeCondition = bikeCondition;
		this.quantity = quantity;
		this.description = description;
		this.image = image;
		this.supplier = supplier;
	}


	// Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBikeName() {
        return bikeName;
    }

    public void setBikeName(String bikeName) {
        this.bikeName = bikeName;
    }

    public String getBikeNumber() {
        return bikeNumber;
    }

    public void setBikeNumber(String bikeNumber) {
        this.bikeNumber = bikeNumber;
    }

    public String getBikeModel() {
        return bikeModel;
    }

    public void setBikeModel(String bikeModel) {
        this.bikeModel = bikeModel;
    }

    public String getBikeBrand() {
        return bikeBrand;
    }

    public void setBikeBrand(String bikeBrand) {
        this.bikeBrand = bikeBrand;
    }

    public String getBikeColor() {
        return bikeColor;
    }

    public void setBikeColor(String bikeColor) {
        this.bikeColor = bikeColor;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getBikeType() {
        return bikeType;
    }

    public void setBikeType(String bikeType) {
        this.bikeType = bikeType;
    }

    public String getBikeCondition() {
        return bikeCondition;
    }

    public void setBikeCondition(String bikeCondition) {
        this.bikeCondition = bikeCondition;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }
}

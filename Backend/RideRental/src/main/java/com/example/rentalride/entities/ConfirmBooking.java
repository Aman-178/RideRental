package com.example.rentalride.entities;

import jakarta.persistence.*;


@Entity
public class ConfirmBooking {
 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	private String CustomerName;
	private String CustomerMobono;
	private String CustomerAddress;
	private String PaymentStatus;
	private String BookingStatus;
	private String OriginalRecceive;
	private String TotalPrice;
	private String BikeNumber;
	private String BikeName;
	private String BikeStatus="customer Didn't Recceived";
	private String SupplierId;
	private String UserId;
	private String BikeCondition;
	
	public ConfirmBooking() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ConfirmBooking(Long id, String customerName, String customerMobono, String customerAddress,
			String paymentStatus, String bookingStatus, String originalRecceive, String totalPrice, String bikeNumber,
			String bikeName, String bikeStatus, String supplierId, String userId, String bikeCondition) {
		super();
		Id = id;
		CustomerName = customerName;
		CustomerMobono = customerMobono;
		CustomerAddress = customerAddress;
		PaymentStatus = paymentStatus;
		BookingStatus = bookingStatus;
		OriginalRecceive = originalRecceive;
		TotalPrice = totalPrice;
		BikeNumber = bikeNumber;
		BikeName = bikeName;
		BikeStatus = bikeStatus;
		SupplierId = supplierId;
		UserId = userId;
		BikeCondition = bikeCondition;
	}

	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public String getCustomerName() {
		return CustomerName;
	}

	public void setCustomerName(String customerName) {
		CustomerName = customerName;
	}

	public String getCustomerMobono() {
		return CustomerMobono;
	}

	public void setCustomerMobono(String customerMobono) {
		CustomerMobono = customerMobono;
	}

	public String getCustomerAddress() {
		return CustomerAddress;
	}

	public void setCustomerAddress(String customerAddress) {
		CustomerAddress = customerAddress;
	}

	public String getPaymentStatus() {
		return PaymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		PaymentStatus = paymentStatus;
	}

	public String getBookingStatus() {
		return BookingStatus;
	}

	public void setBookingStatus(String bookingStatus) {
		BookingStatus = bookingStatus;
	}

	public String getOriginalRecceive() {
		return OriginalRecceive;
	}

	public void setOriginalRecceive(String originalRecceive) {
		OriginalRecceive = originalRecceive;
	}

	public String getTotalPrice() {
		return TotalPrice;
	}

	public void setTotalPrice(String totalPrice) {
		TotalPrice = totalPrice;
	}

	public String getBikeNumber() {
		return BikeNumber;
	}

	public void setBikeNumber(String bikeNumber) {
		BikeNumber = bikeNumber;
	}

	public String getBikeName() {
		return BikeName;
	}

	public void setBikeName(String bikeName) {
		BikeName = bikeName;
	}

	public String getBikeStatus() {
		return BikeStatus;
	}

	public void setBikeStatus(String bikeStatus) {
		BikeStatus = bikeStatus;
	}

	public String getSupplierId() {
		return SupplierId;
	}

	public void setSupplierId(String supplierId) {
		SupplierId = supplierId;
	}

	public String getUserId() {
		return UserId;
	}

	public void setUserId(String userId) {
		UserId = userId;
	}

	public String getBikeCondition() {
		return BikeCondition;
	}

	public void setBikeCondition(String bikeCondition) {
		BikeCondition = bikeCondition;
	}
	
	
	
}

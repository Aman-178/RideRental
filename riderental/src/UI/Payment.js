import React from 'react';
import './Payment.css'; // Import your CSS file
import { useState } from 'react';
export const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    upiId: ''
  })
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData, [name]: value
    });
  }
  const handlePaymetOption = (event) => {
    setPaymentMethod(event.target.value)

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData)
  }
  return (
    <div className="payment-container">
      <h2>Make Payment</h2>
      <div className="payment-form-container">
        <h1>Payment Details</h1>
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="payment-methods">
            <label>
              <input
                type="radio"
                name="payment-method"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={handlePaymetOption}
              />
              Credit/Debit Card
            </label>
            <label>
              <input
                type="radio"
                name="payment-method"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={handlePaymetOption}
              />
              UPI
            </label>
          </div>

          {paymentMethod === 'card' && (
            <div className="payment-details">
              <div className="form-group">
                <label htmlFor="cardName">Name on Card:</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number:</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date:</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV:</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="billingAddress">Billing Address:</label>
                <input
                  type="text"
                  id="billingAddress"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleChange}
                  placeholder="123 Main St"
                  required
                />
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="payment-details">
              <div className="form-group">
                <label htmlFor="upiId">UPI ID:</label>
                <input
                  type="text"
                  id="upiId"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleChange}
                  placeholder="example@upi"
                  required
                />
              </div>
            </div>
          )}

          <button type="submit">Pay Now</button>
        </form>
      </div>
    </div>
  );
};
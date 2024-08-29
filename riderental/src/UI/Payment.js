import React, { useState } from 'react';
import './Payment.css'; // Import the CSS file


export const Payment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    cardType: 'credit', // Default to credit card
    upiId: '',
    confirmUpiId: '',
  });

  const [errors, setErrors] = useState({});

  const totalprice = localStorage.getItem('totalprice') || 0; 
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCardTypeChange = (e) => {
    setFormData({ ...formData, cardType: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.phone) formErrors.phone = 'Phone number is required';

    if (formData.cardType === 'credit' || formData.cardType === 'debit') {
      if (!formData.cardNumber) formErrors.cardNumber = 'Card number is required';
      if (!formData.cardExpiry) formErrors.cardExpiry = 'Card expiry date is required';
      if (!formData.cardCVV) formErrors.cardCVV = 'Card CVV is required';
    }

    if (formData.cardType === 'upi') {
      if (!formData.upiId) formErrors.upiId = 'UPI ID is required';
      if (formData.upiId !== formData.confirmUpiId) formErrors.confirmUpiId = 'UPI IDs do not match';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission (e.g., send data to server)
      console.log('Form data:', formData);
      // You may need to send this data to your server here
    }
  };

  return (
    <div className="payment-page">
      <header>
        <h1 className='completePayment'>Complete Your Payment</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <section className='paymentsection'>
          <h2 className='paymentDetails'>User Information</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </label>
        </section>

        <section className='paymentsection'>
          <h2 className='paymentDetails'>Payment Details</h2>
         
          <label>
            <input
              type="radio"
              name="cardType"
              value="credit"
              checked={formData.cardType === 'credit'}
              onChange={handleCardTypeChange}
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              name="cardType"
              value="debit"
              checked={formData.cardType === 'debit'}
              onChange={handleCardTypeChange}
            />
            Debit Card
          </label>
          <label>
            <input
              type="radio"
              name="cardType"
              value="upi"
              checked={formData.cardType === 'upi'}
              onChange={handleCardTypeChange}
            />
            UPI
          </label>

          {formData.cardType === 'credit' || formData.cardType === 'debit' ? (
            <>
              <label>
                Card Number:
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
                {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
              </label>
              <label>
                Expiry Date (MM/YY):
                <input
                  type="text"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                />
                {errors.cardExpiry && <p className="error">{errors.cardExpiry}</p>}
              </label>
              <label>
                CVV:
                <input
                  type="text"
                  name="cardCVV"
                  value={formData.cardCVV}
                  onChange={handleChange}
                />
                {errors.cardCVV && <p className="error">{errors.cardCVV}</p>}
              </label>
            </>
          ) : null}

          {formData.cardType === 'upi' ? (
            <>
              <label>
                UPI ID:
                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleChange}
                />
                {errors.upiId && <p className="error">{errors.upiId}</p>}
              </label>
              <label>
                Confirm UPI ID:
                <input
                  type="text"
                  name="confirmUpiId"
                  value={formData.confirmUpiId}
                  onChange={handleChange}
                />
                {errors.confirmUpiId && <p className="error">{errors.confirmUpiId}</p>}
              </label>
            </>
          ) : null}
        </section>

        <section>
        
          <button type="submit">
            <p>{'RS.'+totalprice}</p>
            Submit Payment </button>
        </section>
      </form>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import './Myprofile.css';
import axios from 'axios';

export const MyProfile = () => {
  const [visible, setVisible] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    shopname: '',
    address: '',
    contact: '',
    email: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put("http://localhost:9093/supplier", formData);
      if (response.status === 200) { 
        setMessage("Updated Successfully");
        setVisible(true); 
      }
    } catch (error) {
      setMessage("Internal server error");
      setVisible(true); 
    }
  };

  const handleClick = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const id = localStorage.getItem('supplierId');
      if (!id) {
        setError('Please LogIn First..!');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:9093/supplier/${id}`);
        if (response.status === 200) {
          setData(response.data);
          
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <p className="loading">Loading profile data...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="profile-container">
      {visible ? (
        <div className="profile-header">
          {data ? (
            <div className="profile-card">
              <img
                src={data.image || 'default-profile.png'} // Fallback image
                alt={`${data.name}'s profile`}
                className="profile-pictures"
              />
              <div className="profile-info">
                <h1>{data.name}</h1>
                <p>{data.shopname}</p>
              </div>
              <div className="contact-info">
                <h2>Contact Info</h2>
                <p>Email: {data.email}</p>
                <p>Phone: {data.mobno}</p>
                <p>Address: {data.address}</p>
              </div>
              <button className="update-button" onClick={handleClick}>Update Profile</button>
            </div>
          ) : (
            <p>No profile data available.</p>
          )}
        </div>
      ) : (
        <form className="myform" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              placeholder="Full Name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shopname">Shop Name</label>
            <input
              type="text"
              id="shopname"
              name="shopname"
              value={formData.shopname}
              placeholder="Shop Name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              placeholder="Address"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact No</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              placeholder="Contact No"
              maxLength={10}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="Email ID"
              onChange={handleChange}
            />
          </div>
          <div className="message">
            {message && <span>{message}</span>}
          </div>
          <div className="form-group">
            <input type="submit" value="Update" className="submit-button" />
          </div>
        </form>
      )}
    </div>
  );
};

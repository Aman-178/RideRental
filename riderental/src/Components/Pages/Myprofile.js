import React from 'react';
import './Myprofile.css';
import mobileImage from '../../Assets/mobile.webp'; 

export const MyProfile = () => {
  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <img
          src={mobileImage}
          alt="{mobileImage}"
          className="profile-picture"
        />
        <div className="profile-info">
          <h1>Aman</h1>
          <p>Shop Name</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="contact-info">
        <h2>Contact Info</h2>
        <p>Email: john.doe@example.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: Mohali</p>
      </div>
      <button>Update Profile</button>
    </div>
  );
};


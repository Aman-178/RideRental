import React, { useState } from 'react';
import './Myprofile.css';
import mobileImage from '../../Assets/mobile.webp';
import { Updateform } from './Updateform';

export const MyProfile = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };
  return (
    <div className="profile-container">
     <div className='update'>
      {
        visible ? (<Updateform/>):null
      }
     </div>
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

     
      <div className="contact-info">
        <h2>Contact Info</h2>
        <p>Email: john.doe@example.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: Mohali</p>
      </div>
      <div>
        <button onClick={handleClick}>Update Profile</button>
      </div>
    </div>
  );
};


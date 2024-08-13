import React, { useState, useEffect } from 'react';
import './Myprofile.css';
import { Updateform } from './Updateform';
import axios from 'axios';

export const MyProfile = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const id = localStorage.getItem('supplierId');
      if (!id) {
        setError('No supplier ID found in local storage.');
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

  if (loading) return <p>Loading profile data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      <div className='update-form'>
        {visible && <Updateform />}
      </div>
      <div className="profile-header">
        {data ? (
          <div className="profile-card">
            <img
              src={data.image}
              alt={`${data.name}'s profile`}
              className="profile-picture"
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
            <div>
              <button onClick={handleClick}>Update Profile</button>
            </div>
          </div>
        ) : (
          <p>No profile data available.</p>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import './UserProfile.css'; // Import your CSS file here
import { FaUser } from 'react-icons/fa';

export const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    fullname: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA'
  });

  // Toggle editing mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit user data (e.g., via API)
    console.log('User profile updated:', user);
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <h1>My Profile</h1>
      <div className="profile-info">
        <div className="profile-picture">
          <FaUser/>
        </div>
        <div className="profile-details">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name:</label>
                <input
                  type="text"
                  name="fullname"
                  value={user.fullname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Save</button>
            </form>
          ) : (
            <div>
              <p><strong>Full Name:</strong> {user.fullname}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <button className='usereditbutton' onClick={handleEditToggle}>Edit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

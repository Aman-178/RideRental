import React, { useEffect, useState } from 'react';
import './UserProfile.css'; // Import your CSS file here
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setuserdata] = useState({

  });
  const navigate=useNavigate();
  // Toggle editing mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserdata({ ...user, [name]: value });
  };
  useEffect(() => {
    const userid = localStorage.getItem('userid');
    const Fetchprofile = async () => {
      const response = await axios.get('http://localhost:9093/userdata/userprofiledata', {
        params: {
          id: userid

        }
      })
      if (response.status === 200) {
        setuserdata(response.data);
      }
    }
    Fetchprofile();
  },[])
  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response=await axios.put('http://localhost:9093/userdata/updateuser',user)
      if(response.status===200){
         console.log("Updated Successfully");
         
      }
    } catch (error) {
      console.log(error);
    }
    
    setIsEditing(false);
  };
 const handleLogout=()=>{
  localStorage.setItem('isAuthenticated', 'false');
  navigate("/");
 }
  return (
   <div className='profilesection'>
     <div className="user-profile">
      <h1>My Profile</h1>
      <div className="profile-info">
        <div className="profile-picture">
          <FaUser />
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
                  require
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                 
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                 
                />
              </div>
              <button type="submit">Save</button>
            </form>
          ) : (
            <div>
            <div>
              <p><strong>Full Name:</strong> {user.fullname}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.mobno}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <button className='usereditbutton' onClick={handleEditToggle}>Edit</button>
            </div>
                 <button className='user-logout' onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </div>
   </div>
  );
};

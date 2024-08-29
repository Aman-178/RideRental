import React, { useState, useContext, useEffect } from 'react';
import './UserProfile.css'; // Import your CSS file here
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

export const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUser } = useContext(UserContext);
  const [userupdate, setuserupdate] = useState({
    fullname: '',
    email: '',
    mobno: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      updateUser({
        fullname: user.fullname || '',
        email: user.email || '',
        mobno: user.mobno || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const navigate = useNavigate();

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserupdate({ ...userupdate, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userupdate);

    // Add your API call here
    // const id = localStorage.getItem('userid');
    // try {
    //   const response = await axios.put('http://localhost:9093/userdata/updateuser', {
    //     userupdate,
    //     id
    //   });
    //   if (response.status === 200) {
    //     console.log("Updated Successfully");
    //     updateUser(response.data);
    //   }
    // } catch (error) {
    //   console.error('Error updating user:', error);
    // }
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    navigate("/");
  };

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
                    value={userupdate.fullname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={userupdate.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    name="mobno"
                    value={userupdate.mobno}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={userupdate.address}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit">Save</button>
              </form>
            ) : (
              <div>
                <p><strong>Full Name:</strong> {user?.fullname}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Phone:</strong> {user?.mobno}</p>
                <p><strong>Address:</strong> {user?.address}</p>
                <button className='usereditbutton' onClick={handleEditToggle}>Edit</button>
                <button className='user-logout' onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

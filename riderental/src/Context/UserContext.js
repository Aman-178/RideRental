import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; // Ensure you import axios

// Create the context
const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user profile data from localStorage on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userid = localStorage.getItem('userid');
      if (userid) {
        try {
          const response = await axios.get('http://localhost:9093/userdata/userprofiledata', {
            params: { id: userid }
          });
          if (response.status === 200) {
            setUser(response.data);
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      }
    };
    
    fetchUserProfile();
  }, []); // Empty dependency array means this runs once on mount

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };

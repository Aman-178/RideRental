// Header.jsx

import React, { useState } from 'react';
import { FaSearch, FaUserAlt } from 'react-icons/fa';
import { UserOption } from './UserOption';
import './Header.css';

export const Header = () => {
  const [ishovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className='usernav'>
      <div className='userlogo'>
        <h3>RIDE-RENTAL</h3>
      </div>
      <div className='usersearchbar'>
        <input type='search' placeholder='Enter Your Location or Bike' />
        <div className='usersearchicon'><FaSearch /></div>
      </div>
      <div className='userprofileicon' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <FaUserAlt />
        
        {ishovered && <UserOption />}
        
      </div>
    </div>
  );
};

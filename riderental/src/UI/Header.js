import React from 'react'
import { FaSearch, FaUserAlt } from 'react-icons/fa';
import './Header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { UserOption } from './UserOption';
export const Header = () => {
  const [ishovered, setIsHovered] = useState(false);
  //handle Hover Function.
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false);
  }
  return (
    <div className='usernav'>
      <div className='userlogo'>
        <h3>RIDE-RENTAL</h3>
      </div>
      <div className='usersearchbar'>
        <input type='search' placeholder='Enter Your Location or Bike'></input>
        <div className='usersearchicon'> <FaSearch /></div>
      </div>
      <div className='userprofileicon'>
        <Link to='/UserProfile'> <FaUserAlt onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}

        /></Link>
      </div>
       
    </div>
  )
}

import React from 'react'
import { FaSearch, FaUserAlt } from 'react-icons/fa';
import './Header.css';
import { Link } from 'react-router-dom';
export const Header = () => {
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
        <Link to='/UserProfile'> <FaUserAlt /></Link>

      </div>
    </div>
  )
}

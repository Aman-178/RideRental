import React from 'react'
import './UserOption.css'
import { Link } from 'react-router-dom'
export const UserOption = () => {
  return (
    <div className='userList'>
      <ul>
        <li>MyBooking</li>
        <Link to='/UserProfile' style={{ textDecoration: 'none' }}>
          <li>MyProfile</li>
        </Link>            
        <li>Help?</li>
      </ul>
    </div>
  )
}

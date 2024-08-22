import React from 'react'
import './UserOption.css'
import { Link } from 'react-router-dom'
export const UserOption = () => {
  return (
    <div className='userList'>
      <ul>
        <Link to='/bookingpage'style={{ textDecoration: 'none' }}><li>MyBooking</li></Link>
        <Link to='/UserProfile' style={{ textDecoration: 'none' }}>
          <li>MyProfile</li>
        </Link>            
        <li>Help?</li>
      </ul>
    </div>
  )
}

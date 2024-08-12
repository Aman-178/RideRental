import React from 'react'
import { FaMobileAlt } from 'react-icons/fa'
import './Footer.css'
export const Footer = () => {
  return (
    <div className='userFooter'>
       <h3>Contact us : </h3>
       <div className='userinformation'>
            <p><FaMobileAlt/>+919304493057</p>
            <p>Email:amanjmu1999@gmail.com</p>
            <div className='useraddress'>
                <h4>Address:</h4>
                <p>Mohali</p>
            </div>
       </div>
    </div>
  )
}

import React, { useState } from 'react'
import './Signup.css';
export const Signup = () => {
    const [formData,setformData]=useState({
        name:'',
        shopname:'',
        mobno:'',
        email:'',
        email:'',
        address:'',
        Password:'',
        confirmpassword:''
    })
    const handleChange=(event)=>{
         const{value,name}=event.target.trim();
         setformData(
            ...formData,
            [name]
         )

    }
    const handleClick=(event)=>{
        event.preventDefault();
    }
    return (
        <div>
            <form onClick={handleClick}>
                <div>
                    <label>Full Name</label>
                    <input type='text'
                        placeholder='Enter Full Name'
                        name='name'
                        value={FormData.name}
                        required />
                </div>
                <div>
                    <label>Shop Name</label>
                    <input type='text'
                        placeholder='Enter Shop Name'
                        name='shopname'
                        value={FormData.shopname}
                        required />
                </div>
                <div>
                    <label>Mobile No</label>
                    <input type='text'
                        placeholder='Enter Mobile No'
                        name='mobno'
                        value={FormData.mobno}
                        required />
                </div>
                <div>
                    <label>Email</label>
                    <input type='email'
                        placeholder='Enter Email'
                        name='email'
                        value={FormData.email}
                        required />
                </div>
                <div>
                    <label>Address</label>
                    <input type='text'
                        placeholder='Enter Address'
                        name='address'
                        value={FormData.address}
                        required />
                </div>
                <div>
                    <label>Create Password</label>
                    <input type='Password'
                        placeholder='Create Password'
                        name='password'
                        value={FormData.password}
                        required />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type='Password'
                        placeholder='Confirm Password'
                        name='confirmpassword'
                        value={FormData.confirmpassword}
                        required />
                </div>
                <div>
                    <button type='submit' onChange={handleChange}>SignUp</button>
                </div>
            </form>

        </div>
    )
}

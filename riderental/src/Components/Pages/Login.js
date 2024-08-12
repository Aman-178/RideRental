import React, { useState } from 'react';
import './Login.css'; // Import the CSS file
import axios from 'axios';

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        confirmpassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle form submission logic
        try {
            const response=await axios.post('http://localhost:9093/supplier/supplierverifydata',formData);
            if(response.status===200){
               console.log("aman");
            }
        } catch (error) {
            console.log(error);
        }
        
    };

    return (
        <div className='login-container'>
            <div className='login-page'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                          type='email'
                          id='email'
                          name='email'
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                          type='password'
                          id='password'
                          name='confirmpassword'
                          value={formData.confirmpassword}
                          onChange={handleChange}
                          required
                        />
                    </div>
                    <div className='form-group'>
                        <button className='login-button' type='submit'>Login</button>
                    </div>
                    <div className='forgot-password'>
                        <button type='button'>Forgot Password?</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

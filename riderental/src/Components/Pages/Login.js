import React, { useState } from 'react';
import './Login.css'; // Import the CSS file

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log('Form submitted:', formData);
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
                          name='password'
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit'>Login</button>
                    </div>
                    <div className='forgot-password'>
                        <button type='button'>Forgot Password?</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import './Loginpage.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const Loginpage = ({setAuthinacated}) => {
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(true);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [formData1, setFormData1] = useState({
        fullname: '',
        email: '',
        mobno: '',
        password: '',
        cpassword: ''
    });
    
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const handleChange1 = (event) => {
        const { name, value } = event.target;
        setFormData1({
            ...formData1,
            [name]: value
        });
    };

    const handleClick = () => {
        setVisible(!visible);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
           
            const response = await axios.post('http://localhost:9093/userdata/userlogin', formData);
            if (response.status === 200) {
                setAuthinacated(true);
                navigate('/Home');
            }
        } catch (error) {
            setMessage("Login failed. Please check your credentials.");
        } 
    };

    const handleSubmit1 = async (event) => {
        event.preventDefault();
        if (formData1.password !== formData1.cpassword) {
            setMessage("Passwords do not match.");
            return;
        }
        const { cpassword, ...userData } = formData1;
        try {
            const response = await axios.post('http://localhost:9093/userdata/usersignup', userData);
            if (response.status === 201) {
                setMessage("Successfully signed up! Please login.");
            }
        } catch (error) {
            setMessage("Signup failed. Please try again.");
        }
    };

    return (
        <div className="container">
            <div className='welcome'>
                <h1>RIDE-RENTAL</h1>
                <h3>Welcome Back!</h3>
            </div>
            {visible ? (
                <form className="login-form" onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            type='email' 
                            placeholder='Enter Email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input 
                            type='password' 
                            placeholder='Enter Password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input type='submit' value='Login'/>
                    </div>
                    <p>New User? <button className='signupbotton' type="button" onClick={handleClick}>Sign Up</button></p>
                    {message && <div className='Loginmessage'>{message}</div>}
                </form>
            ) : (
                <form className="signup-form" onSubmit={handleSubmit1}>
                    <h2>Sign Up</h2>
                    <div className="form-group">
                        <label>Full Name:</label>
                        <input 
                            type='text'
                            name='fullname'
                            value={formData1.fullname}
                            placeholder='Enter Full Name'
                            onChange={handleChange1}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            type='email'
                            name='email'
                            value={formData1.email}
                            placeholder='Enter Email'
                            onChange={handleChange1}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contact No:</label>
                        <input 
                            type='tel'
                            name='mobno'
                            value={formData1.mobno}
                            placeholder='Enter Contact No'
                            onChange={handleChange1}
                            maxLength={10}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input 
                            type='password'
                            name='password'
                            value={formData1.password}
                            placeholder='Enter Password'
                            onChange={handleChange1}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input 
                            type='password'
                            name='cpassword'
                            placeholder='Confirm Password'
                            onChange={handleChange1}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input type='submit' value='Sign Up'/>
                        {message && <div className='message'>{message}</div>}
                    </div>
                    <p>Already have an account? <button className='loginbutton' type="button" onClick={handleClick}>Login</button></p>
                </form>
            )}
        </div>
    );
};

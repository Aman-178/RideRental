import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

export const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        shopname: '',
        mobno: '',
        email: '',
        address: '',
        password: '',
        confirmpassword: '',
        image: null, // Initialize image as null
    });
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;

        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] }); // Handle file input
        } else if (name === 'mobno') {
            const numericValue = value.replace(/\D/g, '');
            setFormData({ ...formData, [name]: numericValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.password !== formData.confirmpassword) {
            setMessage("Passwords don't match");
            return;
        }
        if(formData.password.length<6){
            setMessage("password should be six character");
            return;
        }
    const hasLetter = /[a-zA-Z]/.test(formData.password);
    const hasNumber = /[0-9]/.test(formData.password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

    if (!hasLetter || !hasNumber || !hasSymbol) {
        setMessage("Password must include at least one letter, one number, and one special character");
        return;
    }
        setMessage('');
       
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('shopname', formData.shopname);
        formDataToSend.append('mobno', formData.mobno);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('confirmpassword', formData.confirmpassword);
        if (formData.image) {
            formDataToSend.append('image', formData.image); // Append the file
        }

        try {
            const response = await axios.post('http://localhost:9093/supplier/createSupplier', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Response:', response.data);
            setFormData({
                name: '',
                shopname: '',
                mobno: '',
                email: '',
                address: '',
                password: '',
                confirmpassword: '',
                image: null,
            });
            setMessage('Signup successful!');
        } catch (error) {
            console.error('Error occurred:', error);
            setMessage('This Email or MobileNO  Already exists!');
        }
    };

    return (
        <div id='signup-form'>
            <form onSubmit={handleSubmit} className='form'>
                <div className='form-row'>
                    <div className='form-div'>
                        <label>Full Name</label>
                        <input
                            type='text'
                            placeholder='Enter Full Name'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-div'>
                        <label>Shop Name</label>
                        <input
                            type='text'
                            placeholder='Enter Shop Name'
                            name='shopname'
                            value={formData.shopname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className='form-row'>
                    <div className='form-div'>
                        <label>Mobile No</label>
                        <input
                            type='tel'
                            placeholder='Enter Mobile No'
                            pattern='[0-9]{10}'
                            name='mobno'
                            value={formData.mobno}
                            onChange={handleChange}
                            maxLength={10}
                            required
                        />
                    </div>
                    <div className='form-div'>
                        <label>Email</label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className='form-row'>
                    <div className='form-div'>
                        <label>Address</label>
                        <input
                            type='text'
                            placeholder='Enter Address'
                            name='address'
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className='form-row'>
                    <div className='form-div'>
                        <label>Create Password</label>
                        <input
                            type='password'
                            placeholder='Create Password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-div'>
                        <label>Confirm Password</label>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            name='confirmpassword'
                            value={formData.confirmpassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className='form-div'>
                    <label>Uplaod Profile Pic</label>
                    <input
                        type='file'
                        name='image'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-row'>
                    <div className='submit-button'>
                        <button type='submit'>Sign Up</button>
                    </div>
                </div>
                <div className='signup-message'>
                    {message && (
                        <div className='error-message'>
                            {message}
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

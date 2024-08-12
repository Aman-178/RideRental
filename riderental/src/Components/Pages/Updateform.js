import axios from 'axios';
import React, { useState } from 'react';
import './Updateform.css'; 

export const Updateform = () => {
    const [visible, setVisible] = useState(true);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        shopname: '',
        address: '',
        contact: '',
        email: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put("http://localhost:9093/supplier", formData);
            if (response.status === 200) { 
                setMessage("Updated Successfully");
                setVisible(false); 
            }
        } catch (error) {
            setMessage("Internal server error");
            setVisible(false); 
        }
    };

   

    return (
        <div className="form-container">
            {visible ? (
                <form className='myform' onSubmit={handleSubmit}>
                    <div className='form-div'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={formData.name}
                            placeholder='Full Name'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-div'>
                        <label htmlFor='shopname'>Shop Name</label>
                        <input
                            type='text'
                            id='shopname'
                            name='shopname'
                            value={formData.shopname}
                            placeholder='Shop Name'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-div'>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            id='address'
                            name='address'
                            value={formData.address}
                            placeholder='Address'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-div'>
                        <label htmlFor='contact'>Contact No</label>
                        <input
                            type='tel'
                            id='contact'
                            name='contact'
                            value={formData.contact}
                            placeholder='Contact No'
                            maxLength={10}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-div'>
                        <label htmlFor='email'>Email ID</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            placeholder='Email ID'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='message'>
                        {message && <span>{message}</span>}
                    </div>
                    <div>
                        <input type='submit' value='Update' />
                    </div>
                </form>
            ) : null
            }
        </div>
    );
};

import React, { useState } from 'react';
import axios from 'axios';
import './Bike.css';

export const Bike = () => {
    const [bike, setBike] = useState({
        bikeName: '',
        bikeNumber: '',
        bikeModel: '',
        bikeBrand: '',
        bikeColor: '',
        price: '',
        bikeType: '',
        bikeCondition: '',
        quantity: '',
        description: '',
        image: null
    });
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            setBike({ ...bike, [name]: files[0] });
        } else {
            setBike({ ...bike, [name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a new FormData object
        const formData = new FormData();
        Object.keys(bike).forEach(key => {
            formData.append(key, bike[key]);
        });
        const id = localStorage.getItem('supplierId');
        formData.append('supplierId', id);
        try {
            const response = await axios.post('http://localhost:9093/bike', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                setMessage('Successfully uploaded!');
                setTimeout(() => {
                    setMessage('');
                }, 2000);

                // Reset form fields
                setBike({
                    bikeName: '',
                    bikeNumber: '',
                    bikeModel: '',
                    bikeBrand: '',
                    bikeColor: '',
                    price: '',
                    bikeType: '',
                    bikeCondition: '',
                    quantity: '',
                    description: '',
                    image: null
                });
            }else if(response.status===409){
                setMessage("Bike No Already Exist")
            }
        } catch (error) {
            console.error('Error in submitting data:', error);
            setMessage('An error occurred while uploading.');
            setTimeout(() => {
                setMessage('');
            }, 2000);
        }
    };

    return (
        <div>
            <div className='bike-form-container'>
                <h2>Bike Information</h2>
                {message && (
                    <div className='message'>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className='bike-form'>
                    <div className='form-group'>
                        <label htmlFor='bikeName'>Bike Name:</label>
                        <input
                            type='text'
                            id='bikeName'
                            name='bikeName'
                            value={bike.bikeName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='bikeNumber'>Bike Number:</label>
                        <input
                            type='text'
                            id='bikeNumber'
                            name='bikeNumber'
                            value={bike.bikeNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='bikeModel'>Bike Model:</label>
                        <input
                            type='text'
                            id='bikeModel'
                            name='bikeModel'
                            value={bike.bikeModel}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='bikeBrand'>Bike Brand:</label>
                        <input
                            type='text'
                            id='bikeBrand'
                            name='bikeBrand'
                            value={bike.bikeBrand}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='bikeColor'>Color:</label>
                        <input
                            type='text'
                            id='bikeColor'
                            name='bikeColor'
                            value={bike.bikeColor}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='bikeType'>Bike Type:</label>
                        <input
                            type='text'
                            id='bikeType'
                            name='bikeType'
                            value={bike.bikeType}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='bikeCondition'>Condition:</label>
                        <select
                            id='bikeCondition'
                            name='bikeCondition'
                            value={bike.bikeCondition}
                            onChange={handleChange}
                        >
                            <option value=''>Select Condition</option>
                            <option value='New'>New</option>
                            <option value='Like new'>Like new</option>
                            <option value='Good'>Good</option>
                            <option value='Fair'>Fair</option>
                            <option value='Poor'>Poor</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='price'>Rental Price (per day):</label>
                        <input
                            type='number'
                            id='price'
                            name='price'
                            value={bike.price}
                            onChange={handleChange}
                            min='0'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='quantity'>Quantity:</label>
                        <input
                            type='number'
                            id='quantity'
                            name='quantity'
                            value={bike.quantity}
                            onChange={handleChange}
                            required
                            min='1'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='image'>Upload Image:</label>
                        <input
                            type='file'
                            id='image'
                            name='image'
                            onChange={handleChange}
                            
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description:</label>
                        <textarea
                            id='description'
                            name='description'
                            value={bike.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button className='bike-button' type='submit'>SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

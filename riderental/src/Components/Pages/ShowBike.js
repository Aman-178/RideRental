import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ShowBike.css'
export const ShowBike = () => {
    const [bikes, setBikes] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchBikes = async () => {
            const id = localStorage.getItem('supplierId');
            try {
                const response = await axios.get(`http://localhost:9093/bike/${id}`);
                if (response.status === 200) {
                    setBikes(response.data); // Assuming response.data is an array of bikes
                } else {
                    setError('Failed to fetch bikes');
                }
            } catch (error) {
                setError('An error occurred while fetching bikes');
                console.error('Error fetching bikes:', error);
            }
        };

        fetchBikes();
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <div>
            <div className='show'>
                {error && <p className='error'>{error}</p>}
                {bikes.length > 0 ? (
                    <ul className='showbikeul'>
                        {bikes.map(bike => (
                            <li className='showbikelist' key={bike.id}>
                                <div className='bikediv'>
                                    <div className='bikename'><h3>{bike.bikeName}</h3></div>
                                    <div className='bikeinfo'>
                                        <div className='bikenum'><p>Number: {bike.bikeNumber}</p></div>
                                        <div className='bikemodal'>
                                            <p>Model: {bike.bikeModel}</p>
                                        </div>
                                        <div className='bikebrand'>
                                            <p>Brand: {bike.bikeBrand}</p>
                                        </div>
                                        <div className='bikecolor'>
                                            <p>Color: {bike.bikeColor}</p>
                                        </div>
                                        <div className='bikecond'><p>Condition: {bike.bikeCondition}</p></div>
                                        <div className='bikequn'><p>Quantity: {bike.quantity}</p></div>
                                        <div className='biketype'><p>Type: {bike.bikeType}</p></div>
                                    </div>
                                    <div className='bikeprice'><p>Price: {bike.price}</p></div>

                                    <div className='bikeimage'>
                                        <img src={bike.image} alt='Bike' />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bikes available</p>
                )}
            </div>
        </div>
    );
};

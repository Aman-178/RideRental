import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ShowBike.css'
export const ShowBike = () => {
    const [bikes, setBikes] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchBikes = async () => {
            try {
                const response = await axios.get('http://localhost:9093/bike');
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
                    <ul>
                        {bikes.map(bike => (
                            <li key={bike.id}>
                                <h3>{bike.bikeName}</h3>
                                <p>Number: {bike.bikeNumber}</p>
                                <p>Model: {bike.bikeModel}</p>
                                <p>Brand: {bike.bikeBrand}</p>
                                <p>Color: {bike.bikeColor}</p>
                                <p>Price: {bike.price}</p>
                                <p>Type: {bike.bikeType}</p>
                                <p>Condition: {bike.bikeCondition}</p>
                                <p>Quantity: {bike.quantity}</p>
                                <p>Description: {bike.description}</p>
                                <div>
                                <img src={bike.image} alt='Bike' />
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

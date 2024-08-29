import React, { useState, useEffect } from 'react';

export const Geolocation = () => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null
    });
    const [isRequested, setIsRequested] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const requestLocation = () => {
        if (navigator.geolocation) {
            setIsRequested(true);
           

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('Position received:', position); // Debug log
                    setLocation({
                        latitude,
                        longitude,
                        error: null
                    });
                   
                },
                (error) => {
                    console.error('Geolocation error:', error); // Debug log
                    setLocation({
                        latitude: null,
                        longitude: null,
                        error: error.message
                    });
                   
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.'); // Debug log
            setLocation({
                latitude: null,
                longitude: null,
                error: "Geolocation is not supported by this browser."
            });
            setIsRequested(true);
        }
    };

    useEffect(() => {
        requestLocation();
        setIsRequested(true);
        console.log(location)
    }, []); 

    return (
        <div>
            {!isRequested && (
                <div>
                    <h1>Please Allow Location!</h1>
                    <button onClick={requestLocation}>Allow Location</button>
                </div>
            )}
        </div>
    );
};



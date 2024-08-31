import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const Geolocation = () => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null
    });
    const [isRequested, setIsRequested] = useState(false); // Track if the request has been made
    const [showButton, setShowButton] = useState(true); // Track if the button should be shown

    const requestLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('Position received:', position); // Debug log
                    setLocation({
                        latitude,
                        longitude,
                        error: null
                    });
                    setIsRequested(true);
                    setShowButton(false);

                    // Send location data to the server
                    try {
                        const response = await axios.post('http://localhost:9093/userdata/location', {
                            latitude,
                            longitude
                        });
                        if (response.status === 200) {
                            localStorage.setItem('address', response.data.location)
                        }
                        console.log('Location sent successfully');
                    } catch (error) {
                        console.error('Error sending location:', error);
                    }
                },
                (error) => {
                    console.error('Geolocation error:', error); // Debug log
                    setLocation({
                        latitude: null,
                        longitude: null,
                        error: error.message
                    });
                    setIsRequested(true);
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
            setShowButton(false); // Hide button if geolocation is not supported
        }
    };


    useEffect(() => {
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
                if (permissionStatus.state === 'granted') {
                    requestLocation();
                    console.log(location)
                    setShowButton(false);
                } else if (permissionStatus.state === 'prompt') {
                    setIsRequested(false);
                    setShowButton(true);

                } else {
                    setIsRequested(true);
                    setShowButton(false);
                }
            });
        } else {

            requestLocation();

        }
    }, []);



    return (
        <div>
            {showButton && !isRequested && (
                <div>
                    <h1>Please Allow Location!</h1>
                    <button onClick={requestLocation}>Allow Location</button>
                </div>
            )}

        </div>
    );
};

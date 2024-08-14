import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Option } from './Option';
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaList, FaCut } from 'react-icons/fa';
import axios from 'axios';

export const Navbar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [iSHovered, setISHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [RequestOrderData, SetRequestOrderData] = useState([])


    // Handlers for mouse events
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleMouseEnterignup = () => setISHovered(true);
    const handleMouseLeavesignup = () => setISHovered(false);
    const handleClick = () => setIsClicked(prevState => !prevState); // Toggle state on click

    useEffect(() => {
        const supplierid = localStorage.getItem('supplierId');
        console.log(supplierid);
        const FetchRequestData = async () => {
            try {
                const response = await axios.get(`http://localhost:9093/bookingdata?supplierid=${supplierid}`);
                console.log('Response data:', response.data);
                if (response.status === 200) {
                    SetRequestOrderData(response.data);
                    console.log(response.data);
                } else {
                    console.log("Api does Not Responding");
                }
            } catch (error) {
                console.log(error);
            }
        }
        FetchRequestData();
        setInterval(() => FetchRequestData(), 1000);
    }, [])

    return (
        <div>
            <div id='header'>
                <div id='logo-icon'>
                    <button onClick={handleClick}>
                        {isClicked ? <FaCut /> : <FaList />}
                    </button>
                    {isClicked ? <Option /> : ""}
                </div>
                <div id='name'>
                    <h2>WELCOME RIDE-RENTAL</h2>
                </div>
                <div>
                    <Link to="/login">
                        <button
                            id='loginbutton'
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            aria-label="Login button"
                        >
                            Login
                            {isHovered ? (
                                <FaArrowAltCircleUp id="icon" />
                            ) : (
                                <FaArrowAltCircleDown id="icon" />
                            )}
                        </button>
                    </Link>
                </div>
                <div>
                    <Link to="/signup">
                        <button
                            id='loginbutton'
                            onMouseEnter={handleMouseEnterignup}
                            onMouseLeave={handleMouseLeavesignup}
                            aria-label="Signup button"
                        >
                            Signup
                            {iSHovered ? (
                                <FaArrowAltCircleUp id="icon" />
                            ) : (
                                <FaArrowAltCircleDown id="icon" />
                            )}
                        </button>
                    </Link>
                </div>
            </div>
            <div>
                <h2>Booking Request</h2>
                <div className='orderrequest'>
                    {
                        RequestOrderData.map((order, index) => (
                            <div className="order-container" key={index}>
                                <div className="order-info">
                                    <p><strong>Customer Name:</strong> {order.username}</p>
                                    <p><strong>Customer Address:</strong> {order.address}</p>
                                    <p><strong>Customer Contact No:</strong> {order.mobomo}</p>
                                </div>
                                <div className="bike-info">
                                    <p><strong>Bike Name:</strong> {order.bikename}</p>
                                    <p><strong>Bike Number:</strong> {order.bikenumber}</p>
                                    <p><strong>Per/Day:</strong> {order.orignalprice}</p>
                                    <p><strong>Total Days:</strong> {order.days}</p>
                                    <p><strong>Total Price:</strong> {order.totalprice}</p>
                                </div>
                                <div className="status-actions">
                                    <p><strong>Status:</strong> {order.status}</p>
                                    <div className="button-group">
                                        <button className="accept-button">Accept</button>
                                        <button className="decline-button">Decline</button>
                                    </div>
                                </div>
                            </div>


                        ))
                    }
                </div>
            </div>
        </div>
    );
};

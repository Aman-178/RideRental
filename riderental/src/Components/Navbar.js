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
    const [requestOrderData, setRequestOrderData] = useState([]);
    const [disabledOrders, setDisabledOrders] = useState(new Set());

    // Handlers for mouse events
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleMouseEnterSignUp = () => setISHovered(true);
    const handleMouseLeaveSignUp = () => setISHovered(false);
    const handleClick = () => setIsClicked(prevState => !prevState);

    useEffect(() => {
        const fetchRequestData = async () => {
            const supplierId = localStorage.getItem('supplierId');
            try {
                const response = await axios.get(`http://localhost:9093/bookingdata?supplierid=${supplierId}`);
                if (response.status === 200) {
                    setRequestOrderData(response.data);
                }
            } catch (error) {
                console.error("Error fetching request data:", error);
            }
        };

        fetchRequestData();
        const intervalId = setInterval(fetchRequestData, 1000);

        return () => clearInterval(intervalId); // Clean up interval on unmount
    }, []);

    const filterData = requestOrderData.filter(order => order.status !== 'successfull');

    const handleAccept = async (index) => {
        const order = filterData[index];
        const orderId = order.id;
        const status = 'Accept';

        try {
            const response = await axios.put('http://localhost:9093/bookingdata/updateStatus', null, {
                params: { id: orderId, status: status }
            });
            if (response.status === 200) {
                setDisabledOrders(prev => new Set(prev).add(orderId));
            }
        } catch (error) {
            console.error("Error updating status to accept:", error);
        }
    };

    const handleDecline = async (index) => {
        const order = filterData[index];
        const orderId = order.id;
        const status = 'Decline';

        try {
            const response = await axios.put('http://localhost:9093/bookingdata/updateStatus', null, {
                params: { id: orderId, status: status }
            });
            if (response.status === 200) {
                setDisabledOrders(prev => new Set(prev).add(orderId));
            }
        } catch (error) {
            console.error("Error updating status to decline:", error);
        }
    };

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
                    <h1>WELCOME RIDE-RENTAL</h1>
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
                            onMouseEnter={handleMouseEnterSignUp}
                            onMouseLeave={handleMouseLeaveSignUp}
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
                <h2 className='headerbooking'>Booking Request:</h2>
                <div className='orderrequest'>
                    {filterData.map((order, index) => (
                        <div className="order-container" key={order.id}>
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
                                    <button
                                        className="accept-button"
                                        onClick={() => handleAccept(index)}
                                        disabled={disabledOrders.has(order.id)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="decline-button"
                                        onClick={() => handleDecline(index)}
                                        disabled={disabledOrders.has(order.id)}
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

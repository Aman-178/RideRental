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
                const response = await axios.get(`http://localhost:9093/bookingdata/getorderbooking?supplierid=${supplierid}`);
                console.log('Response data:', response.data);                
                if (response.status === 200) {
                    SetRequestOrderData(response.data);
                    console.log(response.data);
                }else{
                    console.log("Api does Not Responding");
                }
            } catch (error) {
                console.log(error);
            }
        }
        FetchRequestData();
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
                <div>
                   {
                    RequestOrderData.map(order=>(
                        <div>{order.username}</div>
                    ))
                   }
                </div>
            </div>
        </div>
    );
};

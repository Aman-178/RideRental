import React, { useState } from 'react';
import './Navbar.css';
import { Option } from './Option';
import { FaSearch, FaArrowAltCircleDown, FaArrowAltCircleUp, FaList, FaCut } from 'react-icons/fa';

export const Navbar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // Handlers for mouse events
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleClick = () => setIsClicked(prevState => !prevState); // Toggle state on click
   
    return (
        <div Id='header'>
            <div Id='logo-icon'>
                <button
                    onClick={handleClick}
                    
                >
                    {isClicked ? <FaCut /> : <FaList />}
                    
                </button>
                {isClicked ? <Option/> : ""}
            </div>
            <div Id='searchbar'>
                <input
                    type="search"
                    aria-label="Search"
                />
                <button Id='search-button' aria-label="Search button">
                    <FaSearch />
                </button>
            </div>
            <div>
                <button
                    Id='loginbutton'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    aria-label="Login button"
                >
                    Login
                    {isHovered ? (
                        <FaArrowAltCircleUp Id="icon" />
                    ) : (
                        <FaArrowAltCircleDown Id="icon" />
                    )}
                </button>
            </div>
        </div>
    );
};

import React, { useState } from 'react';
import './Navbar.css'
import { FaSearch, FaArrowAltCircleDown, FaArrowAltCircleUp, FaList } from 'react-icons/fa';

export const Navbar = () => {
    const [isHovered, setIsHovered] = useState(false);

    // Handlers for mouse events
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div id='header'>
            <div id='logoicon'>
                <FaList/>
            </div>
            <div id='searchbar'>
                <input
                    type="search"

                />
                <button id='searchbutton'>
                    <FaSearch />
                </button>
            </div>
            <div >
                <button
                    id='loginbutton'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}

                >
                    Login
                    {isHovered ? (
                        <FaArrowAltCircleUp className="ml-2" />
                    ) : (
                        <FaArrowAltCircleDown className="ml-2" />
                    )}
                </button>
            </div>
        </div>
    );
};

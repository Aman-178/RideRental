import React from 'react'
import './Home.css'
import { Header } from './Header.js'
import { HeroSection } from './HeroSection.js'

export const Home = () => {
    return (
        <div className='containerhome'>
            <div className='userheader'>
                <Header />
            </div>
             <HeroSection/>
          
            
        </div>
    )
}

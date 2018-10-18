import React from 'react';
import './Logo.css';
import Tilt from 'react-tilt';
import brain from './brain.png';

const Logo = () => {
    return (
        <Tilt 
            className="Tilt br2 shadow-4" 
            options={{ max : 55 }} 
            style={{ height: 150, width: 150 }} >
            <div 
                className="Tilt-inner pa3" 
                style={{paddingTop:'20px'}}> 
                <img src={brain} alt='logo' />
            </div>
        </Tilt>    
    );
}

export default Logo;
import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if(isSignedIn) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className='f4 link underline pa3 dim black pointer' style={{marginTop:'5px'}}>Sign Out</p>
            </nav>
        );
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f4 link underline pa3 dim black pointer' style={{marginTop:'5px'}}>Sign In</p>

                <p onClick={() => onRouteChange('register')} className='f4 link underline pa3 dim black pointer' style={{marginTop:'5px'}}>Register</p>
            </nav>
        );
    }
}

export default Navigation;
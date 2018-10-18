import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div>            
            <div className="white f3">
                {`Hi ${name}! The number of faces you've detected are...`}  
            </div>
            <div className="white f1">
                {entries}  
            </div>            
        </div>
    );
}

export default Rank;
import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div> 
            <div>
                <p className="f3">
                    {'This Smart Brain will detect faces in the pictures. Give it a try!'}
                </p>
            </div>           
            <div className='center'> 
                <div className="form center pa4 br3 shadow-5">
                    <input 
                        className="f4 w-70 pa2 center" 
                        type="text" 
                        onChange={onInputChange}
                        placeholder="Enter any image URL here.."
                    />
                    <button 
                        className="w-30 f4 grow link ph3 pv2 dib white bg-light-purple" 
                        onClick={onButtonSubmit}
                    >Detect</button>                
                </div>              
            </div>            
        </div>
    );
}

export default ImageLinkForm;
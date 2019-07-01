import React from 'react';
import './input.css';

const Input = ({rate, onRateChange, rateName, downRate, nominal, rateCharCode, rateCharCode2}) => {

    return (
        <div>
            <h5 className="mb-0 rate-name">
                {rateName}
            </h5>
            <input
                type="text" 
                className="entry-form" 
                aria-label="Text input with dropdown button"
                onChange={(e) => onRateChange(e)}
                value={rate} >
            </input>
            <h6 className="mb-0 down-rate">{nominal} {rateCharCode} = {parseFloat(downRate.toFixed(4))} {rateCharCode2}</h6>
        </div>
    );
};

export default Input;
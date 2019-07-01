import React from 'react';
import './buttons.css';

const Buttons = ({rateCharCode, rateName, modalWindowOpen, arrayButtonGroup, frequentlyUsedButtons}) => {

    return (
        <div 
            className="btn-group frequently-used-buttons" 
            role="group" 
            aria-label="Basic example">
            {arrayButtonGroup.map((e) => {
                return (
                    <button 
                        className="btn btn-secondary buttons"
                        type="button"
                        tooltip={e.Name}
                        key={e.CharCode}
                        onClick={() => frequentlyUsedButtons(e)}>
                        {e.CharCode}
                    </button>
                );
            })}
            <button 
                className="btn btn-success d-flex toggle-modal-window buttons"
                type="button" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="true"
                tooltip={rateName}
                onClick={() => modalWindowOpen()}>
                <p className="char-code">
                    {rateCharCode}
                </p>
                <i className="fa fa-angle-double-down"></i>
            </button>
        </div>
    );
};

export default Buttons;
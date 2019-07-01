import React from 'react';
import './spinner.css';

const SmallSpinner = () => {

    return (
        <div className="lds-css ng-scope">
            <div className="lds-small-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default SmallSpinner;
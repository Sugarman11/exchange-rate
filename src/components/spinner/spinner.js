import React from 'react';
import './spinner.css';

const Spinner = () => {

    return (
        <div className="spinner">
        <h1 className="spinner-title">Loading page</h1>
            <div className="lds-css ng-scope">
                <div className="lds-spinner">
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
        </div>
    );
};

export default Spinner;
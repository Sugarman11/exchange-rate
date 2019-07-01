import React from 'react';
import './row.css';

const Row = ({left, right}) => {

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-xl-7">
                    {left}
                </div>
                <div className="col">
                    {right}
                </div>
            </div>
        </div>
    );
};

export default Row;
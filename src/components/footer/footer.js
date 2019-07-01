import React from 'react';
import './footer.css';

const Footer = () => {

    return (
        <div className="bg-dark footer d-flex">
            <div>
                <h4 className="font-weight">
                    Данные предоставлены сервисом <a href="https://www.cbr-xml-daily.ru" target="blank">https://www.cbr-xml-daily.ru</a>
                </h4>
            </div>
            <div>
                <h5 className="line-height font-weight">
                    Created by @SugarMan
                </h5>
            </div>   
        </div>
    );
};

export default Footer;
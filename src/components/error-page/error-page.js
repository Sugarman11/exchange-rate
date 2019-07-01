import React from 'react';
import './error-page.css';

const ErrorPage = () => {

    return (
        <div className="error-indicator">
            <h2 className="error-title">
                К сожалению при загрузке данных произошла ошибка.
            </h2>
            <h3 className="error-title">
                Пожалуйста проверте соединение с интернетом
            </h3>
        </div>
    );
};

export default ErrorPage;
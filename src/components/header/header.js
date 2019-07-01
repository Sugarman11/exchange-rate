import React, { Component } from 'react';
import * as moment from 'moment';
import { SmallSpinner } from '../spinner';

import './header.css';

export default class Header extends Component {

    state = {
        time: null
    };

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: moment().format('MMMM Do YYYY, h:mm:ss a') }), 1000);
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    };

    renderTime = () => {
        const { time } = this.state;

        if(!time) {
            return (
                <React.Fragment>
                    <h3 className="time-title">Загрузка часового пояса</h3>
                    <SmallSpinner />
                </React.Fragment>
            );
        };

        return (
            <h3 className="time-title">{this.state.time}</h3>
        );
    };
  
    render() {
        return ( 
            <nav className="navbar bg-dark">
                <h1 className="navbar-brand">50/50</h1>
                <div className="render-time">{this.renderTime()}</div>
            </nav> 
        );
    };
};
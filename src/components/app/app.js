import React, { Component } from 'react';
import CbrService from '../../services/cbr-service';
import Header from '../header';

import Row from '../row';
import ExchangeRate from '../exchange-rate';
import CurrencyConverter from '../currency-converter';

import Footer from '../footer';
import ErrorPage from '../error-page';
import {Spinner} from '../spinner';

import 'moment/locale/ru';
import './app.css';

export default class App extends Component {

    cbrService = new CbrService();

    state = {
        valute: [],
        hasError: false,
        loading: true
    };

    componentDidCatch() {
        this.onError();
    };

    onError = () => {
        this.setState({
            hasError: true,
            loading: false
        });
    };

    componentDidMount() {
        this.getRate();
    };

    getRate() {
    this.cbrService
        .getAllRate()
        .then((valute) => {
            this.setState({
                valute: [ ...Object.values(valute), 
                    {
                        ID: "R99999",
                        NumCode: "99",
                        CharCode: "RUR",
                        Nominal: 1,
                        Name: "Российский рубль",
                        Previous: 1,
                        Value: 1
                    }
                ],
                loading: false
            });
        })
        .catch(this.onError)
    };

    render() {
        const { valute, hasError, loading } = this.state;

        const hasValute = !(hasError || loading);

        const content = hasValute ? <Row 
                                        left={<ExchangeRate valute={valute} />} 
                                        right={<CurrencyConverter valute={valute}/>} /> : null
        
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = hasError ? <ErrorPage /> : null;

        return (
            <div className="app">
                <Header />
                {content}
                {spinner}
                {errorMessage}
                <Footer />
            </div>
        );
    };
};
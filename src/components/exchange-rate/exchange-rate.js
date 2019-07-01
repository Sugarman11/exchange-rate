import React, { Component } from 'react';
import CbrService from '../../services/cbr-service';

import * as moment from 'moment';
import './exchange-rate.css';

export default class ExchangeRate extends Component {

    cbrService = new CbrService();

    state = {
        date: null
    };

    componentDidMount() {
        this.getDate();
    };

    carrencyChange = (previous, value) => {
        const changeValue = (value - previous).toFixed(4);

        let style = {
            color: 'red'
        };

        let arrow = ''

        if(changeValue < 0) {
            style = {color: 'red', margin: '0'};
            arrow += 'down'
        };

        if(changeValue > 0) {
            style = {color: 'green', margin: '0'};
            arrow += 'up'
        };
        
        return (
            <span style={style}><i className={`fa fa-arrow-${arrow}`}></i> {Math.abs(changeValue)}</span>
        );
    };

    getDate = () => {
    this.cbrService
    .getDate()
        .then((date) => {
            this.setState({
                date
            });
        });
    };

    render() {
        const { date } = this.state;
        const { valute } = this.props;

        const valuteFilter = valute.filter((e) => e.CharCode !== "RUR");

        if(!date) {
            return null
        };

        return (
            <div>
                <h1 className="mb-3 title">Курсы валют ЦБ РФ на {moment(date).format('DD MMMM YYYY')}</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th className="d-none d-lg-table-cell">Код</th>
                            <th scope="col">Номинал</th>
                            <th scope="col">Валюта</th>
                            <th scope="col">Курс ЦБ</th>
                            <th scope="col">Изменения</th>
                        </tr>
                    </thead>
                    <tbody>
                        {valuteFilter.map(({ CharCode, Nominal, Name, Value, Previous }) => (
                        <tr key={CharCode} className="hover">
                            <th className="d-none d-lg-table-cell">{CharCode}</th>
                            <td className="bold">{Nominal}</td>
                            <td className="bold">{Name}</td>
                            <td className="bold">{Value}</td>
                            <td className="bold">{this.carrencyChange(Previous, Value)}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
};
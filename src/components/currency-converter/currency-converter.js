import React, { Component } from 'react';
import ModalWindow from '../modal-window';
import Input from '../input'

import Buttons from '../buttons'
import CbrService from '../../services/cbr-service';
import './currency-converter.css';


export default class CurrencyConverter extends Component {

    cbrService = new CbrService()

    state = {
        modalWindowShow: false,
        modalWindowShow2: false,
        rateCharCode: '',
        rateCharCode2: 'RUR',
        rateName: '',
        rateName2: 'Российский рубль',
        rate: 0,
        rate2: 0,
        selectedRate: null,
        selectedRate2: 1,
        nominal: null,
        nominal2: 1,
    };

    componentDidMount() {
        this.getDefaultValute();
    };

// Устанавливаем значения в конвертер
    dropDownItemPoperty = (valute, rateCharCode, modalWindowShow, selectedRate, nominal, rateName) => {

        const { Name, ID, Value, Nominal, CharCode } = valute;

        return (
            <div 
                key={ID} className="dropdown-item"
                onClick={() => this.setState({ 
                            [rateCharCode]: CharCode, 
                            [modalWindowShow]: false,
                            [selectedRate]: Value,
                            [nominal]: Nominal,
                            [rateName]: Name,
                            rate: 0,
                            rate2: 0
                        })
                }>
                {Name} 
                <h5 className="dropdown-down-title">{CharCode}</h5>
            </div>
        );
    };

    renderDropDownItem = (valute) => {
        return (
            this.dropDownItemPoperty(valute, 'rateCharCode', 'modalWindowShow', 'selectedRate', 'nominal', 'rateName')
        );
    };

    renderDropDownItem2 = (valute) => {
        return (
            this.dropDownItemPoperty(valute, 'rateCharCode2', 'modalWindowShow2', 'selectedRate2', 'nominal2', 'rateName2')
        );
    };

// Конвертируем валюту
    onRateChangeProperty = (e, selectedRate2, nominal, selectedRate, nominal2, rate2, rate) => {
        const exRate = parseFloat(e.target.value) || 0;
        this.setState({
            [rate2]: exRate,
            [rate]: (exRate * ([selectedRate2] / [nominal2]) / ([selectedRate] / [nominal])).toLocaleString("ru-RU", {useGrouping: true})
        });
    };

    onRateChange = (e) => {
        const {selectedRate2, nominal, selectedRate, nominal2, } = this.state;
        return (
            this.onRateChangeProperty(e, selectedRate, nominal2, selectedRate2, nominal, 'rate', 'rate2')
        );
    };

    onRateChange2 = (e) => {
        const {selectedRate2, nominal, selectedRate, nominal2, } = this.state;
        return (
            this.onRateChangeProperty(e, selectedRate2, nominal, selectedRate, nominal2, 'rate2', 'rate')
        );
    };

// Группа кнопок 'USD' 'EUR' 'RUB'
    frequentlyUsedButtonsProperty = (valute, selectedRate, nominal, rateName, rateCharCode) => {

        const { Name, Value, Nominal, CharCode } = valute;

        this.setState({  
            [selectedRate]: Value,
            [nominal]: Nominal,
            [rateName]: Name,
            [rateCharCode]: CharCode,
            rate: 0,
            rate2: 0
        });
    };

    frequentlyUsedButtons = (valute) => {
        return (
            this.frequentlyUsedButtonsProperty(valute, 'selectedRate', 'nominal', 'rateName', 'rateCharCode')
        );
    };

    frequentlyUsedButtons2 = (valute) => {
        return (
            this.frequentlyUsedButtonsProperty(valute, 'selectedRate2', 'nominal2', 'rateName2', 'rateCharCode2')
        );
    };

//Показать (скрыть) модальное окно
    modalWindowClose = () => {
        this.setState({
            modalWindowShow: false,
            modalWindowShow2: false
        });
    };

    modalWindowOpen = () => {
        this.setState({
            modalWindowShow: true,
        });
    };

    modalWindowOpen2 = () => {
        this.setState({
            modalWindowShow2: true,
        });
    };

//Дефолтные значения в конвертере
    getDefaultValute = () => {
    this.cbrService
    .getUSDRate()
        .then((res) => {
            this.setState({
                selectedRate: res.Value,
                rateName: res.Name,
                rateCharCode: res.CharCode,
                nominal: res.Nominal
            });
        });
    };

    render() {

        const { modalWindowShow,
                modalWindowShow2,
                rateCharCode, 
                rateCharCode2,
                rateName, 
                rateName2, 
                selectedRate, 
                selectedRate2, 
                nominal, 
                nominal2 } = this.state;

        const { valute } = this.props;

        const arrayButtonGroup = valute.filter(e => e.CharCode === 'RUR' || e.CharCode === 'EUR' || e.CharCode === 'USD');

        const downRate = (nominal * (selectedRate / nominal) / (selectedRate2 / nominal2));
        const downRate1 = (nominal2 * (selectedRate2 / nominal2) / (selectedRate / nominal));

        let showModalWindow = '';

        if(modalWindowShow) {
            showModalWindow += 'show';
        };

        let showModalWindow2 = '';

        if(modalWindowShow2) {
            showModalWindow2 += 'show';
        };

        return (
            <div className="jumbotron currency-converter">
                <div className="input-group">
                    <Buttons 
                        modalWindowOpen={() => this.modalWindowOpen()}
                        rateCharCode={rateCharCode}
                        arrayButtonGroup={arrayButtonGroup}
                        frequentlyUsedButtons={(valute) => this.frequentlyUsedButtons(valute)}
                        rateName={this.state.rateName}
                    />

                    <Input 
                        rate={this.state.rate}
                        onRateChange={(e) => this.onRateChange(e)}
                        rateCharCode={rateCharCode}
                        rateCharCode2={rateCharCode2}
                        downRate={downRate}
                        rateName={rateName}
                        nominal={nominal}
                    />

                    <ModalWindow 
                        showModalWindow={showModalWindow} 
                        valute={valute} 
                        renderDropDownItem={(valute) => this.renderDropDownItem(valute)}
                        modalWindowClose={() => this.modalWindowClose()}
                    />
                </div>

                <div className="input-group mt-5">
                    <Buttons 
                        modalWindowOpen={() => this.modalWindowOpen2()}
                        rateCharCode={rateCharCode2}
                        arrayButtonGroup={arrayButtonGroup}
                        frequentlyUsedButtons={(valute) => this.frequentlyUsedButtons2(valute)}
                        rateName={this.state.rateName2}
                    />

                    <Input 
                        rate={this.state.rate2}
                        onRateChange={(e) => this.onRateChange2(e)}
                        rateCharCode={rateCharCode2}
                        rateCharCode2={rateCharCode}
                        rateName={rateName2}
                        nominal={nominal2}
                        downRate={downRate1}
                    />

                    <ModalWindow 
                        showModalWindow={showModalWindow2} 
                        valute={valute} 
                        renderDropDownItem={(valute) => this.renderDropDownItem2(valute)}
                        modalWindowClose={() => this.modalWindowClose()}
                    />
                </div>
            </div>
        );
    };
};
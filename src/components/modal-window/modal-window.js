import React, { Component } from 'react';
import SearchRate from '../search-rate';
import './modal-window.css';

export default class ModalWindow extends Component {

    state = {
        term: ''
    };

    searchRate(valute) {

        const {term} = this.state;

        return valute.filter((e) => {

            if(term.length === 0) {
                return valute;
            };

            return e.Name
                .toLowerCase()
               .indexOf(term.replace(/(^\s*)|(\s*)$/g, '').toLowerCase()) > -1; 
        });
    };

    onSearchChange = (e) => {
        this.setState({
            term: e.target.value
        });
    };

    renderRateList(valute) {

        const { renderDropDownItem } = this.props;
        const visibleValute = this.searchRate(valute)

        return (
            <div 
                className="rate-list"
                onClick={() => this.setState({term: ''})} >
                {visibleValute.map(valute => renderDropDownItem(valute))}
            </div>
        );
    };

    render() {

        const { showModalWindow, valute, modalWindowClose } = this.props;
        const { term } = this.state;

        const valute1 = [ ...valute.slice(0, 12)];
        const valute2 = [ ...valute.slice(12, 24)];
        const valute3 = [ ...valute.slice(24, 35)];
        
        return (
            <div 
                className={`modal ${showModalWindow}`}
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                aria-hidden="true"
                onClick={() => {}}
            >
    
            <div className="modal-window">
                <div className="modal-content">
                    <div className="modal-header">
    
                        <h5 className="modal-title">Пожалуйста выберете валюту</h5>

                        <SearchRate 
                            term={term}
                            onSearchChange={(e) => this.onSearchChange(e)}/>
    
                        <button 
                            type="button" 
                            className="close" 
                            data-dismiss="modal" 
                            aria-label="Close"
                            onClick={() => modalWindowClose()}
                            >

                            <span 
                                aria-hidden="true"
                                onClick={() => this.setState({ term: ''})}>
                                <h1 className="close-title">×</h1>
                            </span>
                        </button>
                    </div>
    
                    <div className="modal-body d-flex">
                        {this.renderRateList(valute1)}
                        {this.renderRateList(valute2)}
                        {this.renderRateList(valute3)}
                    </div>
                </div>
            </div>
        </div>
        );
    };
};
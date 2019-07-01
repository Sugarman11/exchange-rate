import React from 'react'; 
import './search-rate.css';

const SearchRate = ({term, onSearchChange}) => {

    return(
        <div className="search-rate">
            <input 
                className="form-control search-input"
                type="text"
                onChange={(e) => onSearchChange(e)} 
                placeholder="Search"
                value={term}>
            </input>
        </div>
    );
};
export default SearchRate;
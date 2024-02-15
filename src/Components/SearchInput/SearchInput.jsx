import React from "react";
import './SearchInput.css';

function SearchInput({placeholder, valueSearch, setValueSearch})
{

    const onHandleChange = (value) =>{
        setValueSearch(value);
    }

    return(
        <div className="container-search">
            <input type="text" placeholder={placeholder} 
                className="search-input"
                value={valueSearch} 
                onChange={(event) => onHandleChange(event.target.value)} 
            />
        </div>
    )
}

export { SearchInput }
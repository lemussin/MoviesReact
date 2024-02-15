import React, { useContext, useState } from "react";
import './CountryForm.css'
import { useNavigate } from "react-router-dom";
import { MoviesContext } from "../../context/MoviesContext";

function CountryForm({btnText, fnSubmit})
{
    const navigate = useNavigate();
    const {getContries} = useContext(MoviesContext)
    const [country, setCountry] = useState({
        name: '',
        abbreviation: ''
    })

    const onChangeName = (value) =>{
        setCountry({
            ...country,
            name: value
        })
    }

    const onChangeAbb = (value) =>{
        setCountry({
            ...country,
            abbreviation: value
        })
    }

    const onHandleSubmit = async (event) =>
    {
        event.preventDefault();
        const result = await fnSubmit(country);
        if(result.idStatus === 1)
        {
            getContries();
            navigate('/countries');
        }
        else{
            alert(result.message);
        }
    }

    return(
        <form onSubmit={onHandleSubmit} className="country-form-container">
            <div className="row-country">
                <div className="country-form-group">
                    <label className="country-form-label">Investment:</label>
                    <input className="country-form-input" placeholder="Country Name" type="text" value={country.name} onChange={(event) => onChangeName(event.target.value)} />
                </div>
                    
                <div className="country-form-group">
                    <label className="country-form-label">Money collected:</label>
                    <input className="country-form-input" placeholder="Abbreviation" type="text" value={country.abbreviation} onChange={(event) => onChangeAbb(event.target.value)} />
                </div>
            </div>

            <button type="submit" className="country-button-submit">{btnText}</button>
        </form>
    )
}

export { CountryForm }
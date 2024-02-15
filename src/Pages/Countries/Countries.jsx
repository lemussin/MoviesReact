import React, { useContext } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { Title } from "../../Components/Title/Title";
import { MoviesContext } from "../../context/MoviesContext";
import { ValidateSession } from "../../Components/ValidateSession/ValidateSession";
import { Link } from "react-router-dom";
import './Countries.css';
import { AddButton } from "../../Components/AddButton/AddButton";
import { BackButton } from "../../Components/BackButton/BackButton";
import { SearchInput } from "../../Components/SearchInput/SearchInput";


function Countries()
{
    const {logged, countriesAtts} = useContext(MoviesContext);
    const {searchCountry, setSearchCountry, countriesFiltered} = countriesAtts

    if(!logged) {return <ValidateSession />}

    return(
        <Layout>
            <Title text='List of countries' />

            <div className="header-container">
                <div className="header-container-list">
                    <div className="header-container-list-search">
                        <SearchInput placeholder="Buscar Pelicula" valueSearch={searchCountry} setValueSearch={setSearchCountry} />
                    </div>
                    <div className="header-container-list-backbtn">
                        <BackButton />
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id Country</th>
                            <th>Country</th>
                            <th>Abbreviation</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            countriesFiltered.map(country => (
                                <tr key={`Country-${country.idCountry}`}>
                                    <td>{country.idCountry}</td>
                                    <td>{country.name}</td>
                                    <td>{country.abbreviation}</td>
                                    <td>
                                        <Link to={`/edit-movie/${country.idCountry}`} className="button-table-country">Editar</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            
            <AddButton linkRef="/new-country" />
        </Layout>
    )
}

export { Countries }
import React, { useContext } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { Title } from "../../Components/Title/Title";
import { CountryForm } from "../../Components/CountryForm/CountryForm";
import { MoviesContext } from "../../context/MoviesContext";
import { ValidateSession } from "../../Components/ValidateSession/ValidateSession";

function NewCountry()
{
    const {logged, saveNewCountry} = useContext(MoviesContext);

    if(!logged){ return <ValidateSession />}

    return(
        <Layout>
            <Title text='New Country' />

            <CountryForm 
                btnText='Add Country' 
                fnSubmit={saveNewCountry}
            />
        </Layout>
    )
}

export { NewCountry }
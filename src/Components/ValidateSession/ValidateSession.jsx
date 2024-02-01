import React, { useContext } from "react";
import { MoviesContext } from "../../context/MoviesContext";
import { Layout } from "../Layout/Layout";
import { Title } from "../Title/Title";

function ValidateSession()
{
    const {logged} = useContext(MoviesContext);

    
    return(
        <Layout>
            <Title text='Credentials are not valid' />
            <p>Please sign in to continue</p>
        </Layout>
    )

}


export { ValidateSession }
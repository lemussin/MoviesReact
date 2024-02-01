import React, { useContext } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { Title } from "../../Components/Title/Title";
import { MoviesContext } from "../../context/MoviesContext";
import { ValidateSession } from "../../Components/ValidateSession/ValidateSession";
import { MovieForm } from "../../Components/MovieForm/MovieForm";
import './NewMovies.css';

function NewMovie()
{
    const { logged } = useContext(MoviesContext);

    if(!logged) { return <ValidateSession /> }

    return(
        <Layout>
            <Title text='Add a new Movie ' />

            <div className="movie-container">
                <MovieForm />
            </div>
        </Layout>
    )
}

export { NewMovie }
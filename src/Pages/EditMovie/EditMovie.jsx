import React, { useContext } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { Title } from "../../Components/Title/Title";
import { MoviesContext } from "../../context/MoviesContext";
import { ValidateSession } from "../../Components/ValidateSession/ValidateSession";
import { useParams } from "react-router-dom";
import { MovieForm } from "../../Components/MovieForm/MovieForm";

function EditMovie()
{
    const {logged, movies, updateMovie} = useContext(MoviesContext);
    const params = useParams();
    const idMovie = Number(params["idMovie"]);
    const movieObj = movies.find(movie => movie.idMovie === idMovie);

    if(!logged){ return <ValidateSession />}

    return(
        <Layout>
            <Title text='Edit Movie' />

            <div className="movie-container">
                <MovieForm 
                    isNewMovie={false}
                    movieObj={movieObj}
                    textButton="Edit Information"
                    submitFunction={updateMovie}
                />
            </div>
        </Layout>
    )
}

export { EditMovie }
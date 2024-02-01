import React, { useContext } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { ValidateSession } from "../../Components/ValidateSession/ValidateSession";
import { MoviesContext } from "../../context/MoviesContext";
import { Title } from "../../Components/Title/Title";
import './AllMovies.css';


function AllMovies()
{
    const {logged, movies} = useContext(MoviesContext)

    if(!logged){ return <ValidateSession />}

    return(
        <Layout>
            <Title text='Movies List' />
            <div className="table-container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id Movie</th>
                            <th>Movie</th>
                            <th>Director</th>
                            <th>Duration</th>
                            <th>Release Date</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movies.map(movie => (
                                <tr>
                                    <td>{movie.idMovie}</td>
                                    <td>{movie.name}</td>
                                    <td>{movie.director}</td>
                                    <td>{movie.durationTime}</td>
                                    <td>{movie.releaseDate}</td>
                                    <td></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export { AllMovies }
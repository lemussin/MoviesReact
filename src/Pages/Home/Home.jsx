import React, { useContext } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { Title } from "../../Components/Title/Title";
import { MoviesContext } from "../../context/MoviesContext";
import { Loading } from "../../Components/Loading/Loading";
import './Home.css';


function Home(){

    const { loadingInitialData, lastMovies } = useContext(MoviesContext)

    if(loadingInitialData) return <Loading />

    return(
        <Layout>
            <Title text='Welcome to Movies DB' />
            <h4 className="subtitle">New movies</h4>
            <div className="main-gallery">
                <div className="gallery">
                    {
                        !loadingInitialData && lastMovies.length > 0 && lastMovies.map(movie => (
                            <figure className="card" key={'imgHome-'+movie.idMovie}>
                                <img
                                    src={movie.moviePicture}
                                    alt={movie.name}
                                />
                            </figure>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export { Home }
import React, { useContext, useState } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { ValidateSession } from "../../Components/ValidateSession/ValidateSession";
import { MoviesContext } from "../../context/MoviesContext";
import { Title } from "../../Components/Title/Title";
import './AllMovies.css';
import { Link } from "react-router-dom";
import { Modal } from "../../Components/Modal/Modal";
import { AddButton } from "../../Components/AddButton/AddButton";
import { SearchInput } from "../../Components/SearchInput/SearchInput";
import { BackButton } from "../../Components/BackButton/BackButton";


function AllMovies()
{
    const {logged, showModal, deleteMovieById, setShowModal, moviesAtts} = useContext(MoviesContext)
    const {searchMovie, setSearchMovie, moviesFiltered} = moviesAtts
    const [idDel, setIdDel] = useState(0);

    if(!logged){ return <ValidateSession />}

    const onDelete = (idMovie) =>{
        setIdDel(idMovie)
        setShowModal(true)
    }

    return(
        <Layout>
            <Title text='Movies List' />

            <div className="header-container">
                <div className="header-container-list">
                    <div className="header-container-list-search">
                        <SearchInput placeholder="Buscar Pelicula" valueSearch={searchMovie} setValueSearch={setSearchMovie} />
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
                            moviesFiltered.map(movie => (
                                <tr key={`Movie-${movie.idMovie}`}>
                                    <td>{movie.idMovie}</td>
                                    <td>{movie.name}</td>
                                    <td>{movie.director}</td>
                                    <td>{movie.durationTime}</td>
                                    <td>{movie.releaseDate}</td>
                                    <td>
                                        <Link to={`/edit-movie/${movie.idMovie}`} className="button-table-movie">Editar</Link>
                                        <button className="button-table-movie delete" onClick={() => onDelete(movie.idMovie)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {
                showModal && <Modal titulo='Delete Movie' sbtFunction={deleteMovieById} id={idDel} >¿Desea eliminar este registro?</Modal>
            }

            <AddButton linkRef="/new-movie" />
        </Layout>
    )
}

export { AllMovies }
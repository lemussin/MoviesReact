import React, { createContext } from "react";
import { useApi } from "../Hooks/useApi";

const MoviesContext = createContext({})

function MoviesProvider({children})
{
    const { saveNewUser, loadingInitialData, gender, logged, setLogged, setUserInfo, validateSignIn, getUserInformation, saveNewMovie,
        getAllMovies, closeSession, updateMovie, showModal, setShowModal, deleteMovieById, deleteCountryById, saveNewCountry, getContries,
        userInfo, countries, languages, distributors, movies, lastMovies,
        moviesAtts, countriesAtts
    } = useApi();

    return(
        <MoviesContext.Provider value={{ saveNewUser, loadingInitialData, logged, setLogged, saveNewMovie, closeSession, userInfo, 
            updateMovie, showModal, setShowModal, deleteMovieById, deleteCountryById, saveNewCountry, getContries,
            setUserInfo, validateSignIn, getUserInformation, getAllMovies, gender, countries, languages, distributors, movies, lastMovies,
            moviesAtts, countriesAtts
        }}>
            {children}
        </MoviesContext.Provider>
    )
}

export { MoviesProvider, MoviesContext }
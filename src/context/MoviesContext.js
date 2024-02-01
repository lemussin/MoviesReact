import React, { createContext } from "react";
import { useApi } from "../Hooks/useApi";

const MoviesContext = createContext({})

function MoviesProvider({children})
{
    const { saveNewUser, loadingInitialData, gender, logged, setLogged, setUserInfo, validateSignIn, getUserInformation, saveNewMovie,
        getAllMovies, closeSession,
        userInfo, countries, languages, distributors, movies, lastMovies
    } = useApi();

    return(
        <MoviesContext.Provider value={{ saveNewUser, loadingInitialData, logged, setLogged, saveNewMovie, closeSession, userInfo, 
            setUserInfo, validateSignIn, getUserInformation, getAllMovies, gender, countries, languages, distributors, movies, lastMovies }}>
            {children}
        </MoviesContext.Provider>
    )
}

export { MoviesProvider, MoviesContext }
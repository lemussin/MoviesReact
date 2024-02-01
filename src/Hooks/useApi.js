import React, { useState } from "react";
import { useUserAPI } from "../API/useUserAPI";

function useApi()
{
    const [logged, setLogged] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const { postNewUser, postSignInValidate, getUserInfo, postMovie, getMovies, 
        loadingInitialData, gender, countries, languages, distributors, movies, lastMovies, setToken
    } = useUserAPI()

    const saveNewUser = async (user) => {
        const result = await postNewUser(user);
        return result;
    }

    const validateSignIn = async (userSignIn) =>{
        const result = await postSignInValidate(userSignIn);

        if(result.result.idStatus === 1)
        {
            await localStorage.setItem('token', result.token);
            await localStorage.setItem('time', result.validateTime);
            await localStorage.setItem('user', userSignIn.username);
            await getAllMovies();
        }

        return result.result;
    }

    const getUserInformation = async (idUser) =>{
        const userinfo = await getUserInfo(idUser);
        let user = setUserJSON(userinfo);
        setUserInfo(user);
        return 1;
    }

    const saveNewMovie = async (movie) =>{
        const result = await postMovie(movie);
        return result;
    }

    const getAllMovies = async () => {
        await getMovies();
    }

    const closeSession = () =>{
        setUserInfo({});
        localStorage.setItem('token', '');
        localStorage.setItem('time', '');
        localStorage.setItem('user', '');
        setLogged(false);
    }

    return { loadingInitialData, saveNewUser, setLogged, setUserInfo, validateSignIn, getUserInformation, saveNewMovie, getAllMovies,
        closeSession,
        logged, userInfo, gender, countries, languages, distributors, movies, lastMovies
    }

}

function setUserJSON(userinfo){
    let user = {
        id: userinfo.idUSer,
        Name: userinfo.first_Name,
        Last_name: userinfo.last_name,
        Last_name2: userinfo.last_Name_2,
        Username: userinfo.username,
        Email: userinfo.email,
        Passwrd: '',
        Birthday: userinfo.birthday,
        IdGender: userinfo.idGender
    }

    return user;
}

export { useApi }
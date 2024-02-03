import React, { useEffect, useState } from "react";


function useUserAPI()
{

    const [loadingInitialData, setloadingInitialData] = useState(false);
    const [gender, setGender] = useState({});
    const [countries, setCountries] = useState({});
    const [languages, setLanguages] = useState({});
    const [distributors, setDistributors] = useState({});
    const [movies, setMovies] = useState({});
    const [lastMovies, setLastMovies] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [logged, setLogged] = useState(false);

    const getGender = () => {
        fetch('/api/Catalogue/catgender')
        .then(response => response.json())
        .then(response => setGender(response))
    }

    const getContries = () =>{
        fetch('/api/Catalogue/catcountry')
        .then(response => response.json())
        .then(response => setCountries(response))
    }

    const getLanguages = () =>{
        fetch('/api/Catalogue/catlanguage')
        .then(response => response.json())
        .then(response => setLanguages(response))
    }

    const getDistributors = () =>{
        fetch('/api/Catalogue/catdistributor')
        .then(response => response.json())
        .then(response => setDistributors(response))
    }

    const getLastMovies = () =>{
        fetch('/api/Movie/GetLastMovies')
        .then(response => response.json())
        .then(response => setLastMovies(response))
    }

    const postValidationToken = async () =>{
        let date = localStorage.getItem('time');
        let result;


        await fetch('/api/User/PostValidateSession', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Pragma: 'no-cache',
            },
            body: JSON.stringify(date),
            credentials: 'include',
            mode: 'cors',
        })
        .then(response => response.json())
        .then(response => result = response);

        return await result.isValid
        
    }

    const validateToken = async () =>
    {
        let token = localStorage.getItem('token');
        if(token)
        {
            let isValid = await postValidationToken();
            if(isValid)
            {
                const username = localStorage.getItem('user');
                let response = await getUserInfoByUsername(username);
                const currentUser = await createUserState(response.user);
                await setUserInfo(currentUser);
                await setLogged(true);
                await getMovies();
            }
        }
    }

    useEffect(() => {
        setloadingInitialData(true)
        getLastMovies();
        getGender();
        getContries();
        getLanguages();
        getDistributors();
        validateToken();
        setTimeout(() => {
            setloadingInitialData(false)
        }, 1500)
        
    }, [])

    const postNewUser = async (newUser) =>{
        
        let user ={
            "idUSer": 0,
            "first_Name": newUser.Name,
            "last_name": newUser.Last_name,
            "last_Name_2": newUser.Last_name2,
            "username": newUser.Username,
            "email": newUser.Email,
            "passwrd": newUser.Passwrd,
            "birthday": newUser.Birthday,
            "register_Date": '2024-01-19',
            "idGender": newUser.idGender
        }

        const response = await fetch('/api/User', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Pragma: 'no-cache',
            },
            body: JSON.stringify(user),
            credentials: 'include',
            mode: 'cors',
        })
        let result = await response.json();
        return result
    }

    const postSignInValidate = async (userSignIn) =>{
        let responseB;
        let user = {
            "username": userSignIn.username,
            "password": userSignIn.password
        }

        const response = await fetch('/api/User/SignInValidate', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Pragma: 'no-cache',
            },
            body: JSON.stringify(user),
            credentials: 'include',
            mode: 'cors',
        })
        .then(result => result.json())
        .then(result => responseB = result)

        //let result = await response.json();
        
        return responseB
    }

    const getUserInfo = async (idUser) => {
        const URL = '/api/User/GetUserInformation/' + idUser;
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Pragma: 'no-cache',
            },
            credentials: 'include',
            mode: 'cors',
        });
        let result = await response.json();
        return result;
    }

    const getUserInfoByUsername = async (username) => {
        const token = localStorage.getItem('token');

        const URL = '/api/User/GetUserInformationByUsername/' + username;
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            credentials: 'include',
            mode: 'cors',
        });
        let result = await response.json();
        return result;
    }

    const postMovie = async (newMovie) =>
    {
        const token = localStorage.getItem('token');
        let movie =
        {
            "name": newMovie.name,
            "director": newMovie.director,
            "idDistributor": newMovie.idDistributor,
            "releaseDate": newMovie.releaseDate,
            "durationTime": newMovie.durationTime,
            "idCountry": newMovie.idCountry,
            "idLanguage": newMovie.idLanguage,
            "investment": newMovie.investment,
            "collectionMoney": newMovie.collectionMoney,
            "moviePicture": newMovie.moviePicture,
            "idUser": newMovie.idUser
        }

        const response = await fetch('/api/Movie/SaveMovie', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Pragma: 'no-cache',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(movie),
            credentials: 'include',
            mode: 'cors',
        })
        let result = await response.json();
        return result
    }

    const getMovies = async () =>{
        const token = localStorage.getItem('token');

        const response = await fetch('/api/Movie/GetMovie', {
            //method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
        let result = await response.json();
        await setMovies(result);
    }

    return { loadingInitialData, userInfo, setUserInfo, logged, setLogged,
        postNewUser, postSignInValidate, getUserInfo, postMovie, getMovies,
        gender, countries, languages, distributors, movies, lastMovies}
}

function createUserState(user)
{
    let obj = {
        id: user.idUSer,
        Name: user.first_Name,
        Last_name: user.last_name,
        Last_name2: user.last_Name_2,
        Username: user.username,
        Email: user.email,
        Passwrd: user.passwrd,
        Birthday: user.birthday,
        IdGender: user.idGender
    }
    return obj;
}

export { useUserAPI }
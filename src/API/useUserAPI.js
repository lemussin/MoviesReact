import { useEffect, useState } from "react";


function useUserAPI()
{

    const [loadingInitialData, setloadingInitialData] = useState(false);
    const [gender, setGender] = useState([]);
    const [countries, setCountries] = useState([]);
    const [languages, setLanguages] = useState({});
    const [distributors, setDistributors] = useState({});
    const [movies, setMovies] = useState([]);
    const [lastMovies, setLastMovies] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [logged, setLogged] = useState(false);
    const [showModal, setShowModal] = useState(false);

    //Search filter for movies list
    const [searchMovie, setSearchMovie] = useState('');
    const [moviesFiltered, setMoviesFiltered] = useState([])

    //Search filter for countries list
    const [searchCountry, setSearchCountry] = useState('');
    const [countriesFiltered, setCountriesFiltered] = useState([])

    useEffect(() => {
        if(searchMovie.length <= 0){
            setMoviesFiltered(movies);
        }
        else{
            let lista = movies.filter(movie => movie.name.toLowerCase().includes(searchMovie.toLowerCase()))
            setMoviesFiltered(lista);
        }
    }, [searchMovie])


    useEffect(() => {
        if(searchCountry.length <= 0){
            setCountriesFiltered(countries);
        }
        else{
            let lista = countries.filter(country => country.name.toLowerCase().includes(searchCountry.toLowerCase()))
            setCountriesFiltered(lista);
        }
    }, [searchCountry])

    //Load gender list
    const getGender = () => {
        fetch('/api/Catalogue/catgender')
        .then(response => response.json())
        .then(response => {
            if(response.resultService.idStatus === 1)
            {
                setGender(response.data)
            }
            else{
                console.error(response.resultService.message);
            }
        })
    }

    //load Countries list
    const getContries = () =>{
        fetch('/api/Catalogue/catcountry')
        .then(response => response.json())
        .then(response => {
            if(response.resultService.idStatus === 1)
            {
                setCountries(response.data);
                setCountriesFiltered(response.data);
            }
            else{
                console.error(response.resultService.message);
            }
        })
    }

    //load Languages list
    const getLanguages = () =>{
        fetch('/api/Catalogue/catlanguage')
        .then(response => response.json())
        .then(response => {
            if(response.resultService.idStatus === 1)
            {
                setLanguages(response.data)
            }
            else{
                console.error(response.resultService.message);
            }
        })
    }

    //load distributors list
    const getDistributors = () =>{
        fetch('/api/Catalogue/catdistributor')
        .then(response => response.json())
        .then(response => {
            if(response.resultService.idStatus === 1)
            {
                setDistributors(response.data)
            }
            else{
                console.error(response.resultService.message);
            }
        })
    }

    //Load Last 4 movies
    const getLastMovies = () =>{
        fetch('/api/Movie/GetLastMovies')
        .then(response => response.json())
        .then(response => {
            if(response.resultService.idStatus === 1)
            {
                setLastMovies(response.data)
            }
            else{
                console.error(response.resultService.message);
            }
        })
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
                if(response !== null)
                {
                    const currentUser = await createUserState(response.data);
                    await setUserInfo(currentUser);
                    await setLogged(true);
                    await getMovies();
                }
                
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
        getMovies();
        setTimeout(() => {
            setloadingInitialData(false)
        }, 2000)
        
    }, [])

    const postNewUser = async (newUser) =>{
        let result;
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
        .then(response => response.json())
        .then(response => {
            result = response.resultService;
            if(response.resultService.idStatus !== 1)
            {
                console.error(response.resultService.message)
            }
        })
        .catch(error =>{
            result = null;
            setLogged(false);
        });

        return result
    }

    const postSignInValidate = async (userSignIn) =>{
        let responseB;
        let user = {
            "username": userSignIn.username,
            "password": userSignIn.password
        }

        await fetch('/api/User/SignInValidate', {
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
        
        return responseB
    }

    const getUserInfo = async (idUser) => {
        let result;
        const URL = '/api/User/GetUserInformation/' + idUser;
        await fetch(URL, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Pragma: 'no-cache',
            },
            credentials: 'include',
            mode: 'cors',
        })
        .then(response => response.json())
        .then(response => {
            
            if(response.resultService.idStatus !== 1)
            {
                console.error(response.resultService.message)
            }
            else{
                result = response.data
            }
        })
        .catch(error =>{
            result = null;
            setLogged(false);
        });

        return result;
    }

    const getUserInfoByUsername = async (username) => {
        let result = {};
        const token = localStorage.getItem('token');

        const URL = '/api/User/GetUserInformationByUsername/' + username;
        await fetch(URL, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            credentials: 'include',
            mode: 'cors',
        })
        .then(response => response.json())
        .then(response => {
            result = response
            if(response.resultService.idStatus !== 1)
            {
                console.error(response.resultService.message)
            }
        })
        .catch(error =>{
            result = null;
            setLogged(false);
        })
        //let result = await response.json();
        return await result;
    }

    const postMovie = async (newMovie) =>
    {
        let result;
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
        .then(response => response.json())
        .then(response => {
            result = response.resultService
            if(response.resultService.idStatus !== 1)
            {
                console.error(response.resultService.message)
            }
        })
        .catch(error =>{
            result = null;
            setLogged(false);
        });

        return result;
    }

    const putMovie = async (updateMovie) =>
    {
        const token = localStorage.getItem('token');
        let result;
        let movie =
        {
            "idMovie":updateMovie.idMovie,
            "name": updateMovie.name,
            "director": updateMovie.director,
            "idDistributor": updateMovie.idDistributor,
            "releaseDate": updateMovie.releaseDate,
            "durationTime": updateMovie.durationTime,
            "idCountry": updateMovie.idCountry,
            "idLanguage": updateMovie.idLanguage,
            "investment": updateMovie.investment,
            "collectionMoney": updateMovie.collectionMoney,
            "moviePicture": updateMovie.moviePicture,
            "idUser": updateMovie.idUser
        }

        await fetch('/api/Movie/UpdateMovie', {
            method: "PUT",
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
        .then(response => response.json())
        .then(response => {
            result = response.resultService
            if(response.resultService.idStatus !== 1)
            {
                console.error(response.resultService.message)
            }
        })
        .catch(error =>{
            result = null;
            setLogged(false);
        });

        return result;
    }

    const getMovies = async () =>{
        const token = localStorage.getItem('token');

        await fetch('/api/Movie/GetMovie', {
            //method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(response => response.json())
        .then(response => {
            if(response.resultService.idStatus === 1)
            {
                setMovies(response.data);
                setMoviesFiltered(response.data);
            }
            else{
                console.error(response.resultService.message);
            }
            
        })
        /*.then(response => {
            switch(response.status)
            {
                case 200:
                    break;
                case 401: console.error('Unauthorized');
                break;
                case 500: console.error("server error");
                break;
            }

            if(response.ok)
            {
              
            }
            else{
                setMovies({});
            }
        })*/
        .catch(error => {
            setMovies([]);
            setLogged(false);
        })
        //let result = await response.json();
        //await setMovies(result);
    }

    const deleteMovie = async (idMovie) => {
        let result = {};
        const token = localStorage.getItem('token');

        const URL = '/api/Movie/DeleteMovie/' + idMovie;
        await fetch(URL, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            credentials: 'include',
            mode: 'cors',
        })
        .then(response => response.json())
        .then(response => {
            result = response.resultService
            if(response.resultService.idStatus !== 1)
            {
                console.error(response.resultService.message)
            }
        })
        .catch(error =>{
            result = null;
            setLogged(false);
        })
        
        return await result;
    }

    const postCountry = async (newCountry) =>
    {
        let result;
        const token = localStorage.getItem('token');
        await fetch('/api/Catalogue/createcountry', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Pragma: 'no-cache',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(newCountry),
            credentials: 'include',
            mode: 'cors',
        })
        .then(response => response.json())
        .then(response => {
            result = response.resultService
            if(response.resultService.idStatus !== 1)
            {
                console.error(response.resultService.message)
            }
        })
        .catch(error =>{
            result = null;
            setLogged(false);
        });

        return await result;
    }

    const moviesAtts = {searchMovie, setSearchMovie, moviesFiltered}
    const countriesAtts = {searchCountry, setSearchCountry, countriesFiltered}

    return { loadingInitialData, userInfo, setUserInfo, logged, setLogged, showModal, setShowModal,
        postNewUser, postSignInValidate, getUserInfo, postMovie, getMovies, putMovie, deleteMovie, postCountry, getContries,
        gender, countries, languages, distributors, movies, lastMovies,
        moviesAtts, countriesAtts
    }
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
        IdGender: user.idGender,
        Gender_Name: user.genderObj.name,
        Gender_Abbreviation: user.genderObj.abbreviation
    }
    return obj;
}

export { useUserAPI }
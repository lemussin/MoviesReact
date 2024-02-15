import React, { useContext, useState } from "react";
import './MovieForm.css';
import { MoviesContext } from "../../context/MoviesContext";
import { useNavigate } from "react-router-dom";

function MovieForm({isNewMovie, movieObj, textButton, submitFunction})
{
    const navigate = useNavigate();
    const {userInfo, distributors, countries, languages, getAllMovies} = useContext(MoviesContext);

    const [movie, setMovie] = useState({
        idMovie: movieObj?.idMovie || 0,
        name: movieObj?.name || '',
        director: movieObj?.director || '',
        idDistributor: movieObj?.idDistributor || 0,
        releaseDate: movieObj?.releaseDate || '',
        durationTime: movieObj?.durationTime || 0,
        idCountry: movieObj?.idCountry || 0,
        idLanguage: movieObj?.idLanguage || 0,
        investment: movieObj?.investment || 0,
        collectionMoney: movieObj?.collectionMoney || 0,
        moviePicture: movieObj?.moviePicture || '',
        active: movieObj?.active || 1,
        registerDate:movieObj?.registerDate || '',
        idUser: userInfo.id
    })

    const onChangeName = (value) =>{
        setMovie({
            ...movie,
            name: value
        })
    }

    const onChangeDirectorName = (value) =>{
        setMovie({
            ...movie,
            director: value
        })
    }

    const onChangeDistributor = (value) =>{
        setMovie({
            ...movie,
            idDistributor: value
        })
    }

    const onChangeRelease = (value) =>{
        setMovie({
            ...movie,
            releaseDate: value
        })
    }

    const onChangeDuration = (value) =>{
        setMovie({
            ...movie,
            durationTime: value
        })
    }

    const onChangeCountry = (value) =>{
        setMovie({
            ...movie,
            idCountry: value
        })
    }

    const onChangeInvestment = (value) =>{
        setMovie({
            ...movie,
            investment: value
        })
    }

    const onChangeCollectionMon = (value) =>{
        setMovie({
            ...movie,
            collectionMoney: value
        })
    }

    const onChangeLanguage = (value) =>{
        setMovie({
            ...movie,
            idLanguage: value
        })
    }

    const onChangePicture = (value) =>{
        setMovie({
            ...movie,
            moviePicture: value
        })
    }

    const onSubmitMovie = async (event) =>{
        event.preventDefault();
        const result = await submitFunction(movie)
        alert(result.message + ' '+ result.idStatus);
        if(result.idStatus === 1)
        {
            await getAllMovies();
            navigate('/movies');
        }
        /*
        if(isNewMovie)
        {
            const result = await saveNewMovie(movie);
            alert(result.message + ' '+ result.idStatus);
            if(result.idStatus === 1)
            {
                await getAllMovies();
                navigate('/movies');
            }
        }
        else{
            const result = await updateMovie(movie);
            alert(result.message + ' '+ result.idStatus);
            if(result.idStatus === 1)
            {
                await getAllMovies();
                navigate('/movies');
            }
        }
        */
        
    }

    return(
        <div>
            <form className="movie-form-container" onSubmit={onSubmitMovie}>
                <div className="row-movie">
                    <div className="movie-form-group">
                        <label className="movie-form-label">Movie name:</label>
                        <input className="movie-form-input" placeholder="Movie Name" type="text" value={movie.name} onChange={(event) => onChangeName(event.target.value)} />
                    </div>
                    
                    <div className="movie-form-group">
                        <label className="movie-form-label">Director Name</label>
                        <input className="movie-form-input" placeholder="Director Name" type="text" value={movie.director} onChange={(event) => onChangeDirectorName(event.target.value)} />
                    </div>

                    <div className="movie-form-group">
                        <label className="movie-form-label">Distributor:</label>
                        <select className="movie-form-input" value={movie.idDistributor} onChange={(event) => onChangeDistributor(event.target.value)}>
                            <option value=''>--Select an option--</option>
                            {
                                distributors.map(distr => (
                                    <option value={distr.idDistributor}>{distr.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="row-movie">
                    <div className="movie-form-group">
                        <label className="movie-form-label">Release Date:</label>
                        <input className="movie-form-input" placeholder="Release" type="date" value={movie.releaseDate} onChange={(event) => onChangeRelease(event.target.value)} />
                    </div>
                    
                    <div className="movie-form-group">
                        <label className="movie-form-label">Duration Time (Minutes)</label>
                        <input className="movie-form-input" placeholder="Duration Time" type="number" value={movie.durationTime} onChange={(event) => onChangeDuration(event.target.value)} />
                    </div>

                    <div className="movie-form-group">
                        <label className="movie-form-label">Country:</label>
                        <select className="movie-form-input" value={movie.idCountry} onChange={(event) => onChangeCountry(event.target.value)}>
                            <option value=''>--Select an option--</option>
                            {
                                countries.map(country => (
                                    <option value={country.idCountry}>{country.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="row-movie">
                    <div className="movie-form-group">
                        <label className="movie-form-label">Investment:</label>
                        <input className="movie-form-input" placeholder="Investments" type="number" value={movie.investment} onChange={(event) => onChangeInvestment(event.target.value)} />
                    </div>
                    
                    <div className="movie-form-group">
                        <label className="movie-form-label">Money collected:</label>
                        <input className="movie-form-input" placeholder="Money collected" type="number" value={movie.collectionMoney} onChange={(event) => onChangeCollectionMon(event.target.value)} />
                    </div>

                    <div className="movie-form-group">
                        <label className="movie-form-label">Language:</label>
                        <select className="movie-form-input" value={movie.idLanguage} onChange={(event) => onChangeLanguage(event.target.value)}>
                            <option value=''>--Select an option--</option>
                            {
                                languages.map(language => (
                                    <option value={language.idLanguage}>{language.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="row-movie">
                    <div className="movie-form-group-alone">
                        <label className="movie-form-label">Picture (URL):</label>
                        <input className="movie-form-input" placeholder="Movie profile picture" type="text" value={movie.moviePicture} onChange={(event) => onChangePicture(event.target.value)} />
                    </div>
                </div>

                <button type="submit" className="movie-button-submit">{textButton}</button>

            </form>
        </div>
    )
}

export { MovieForm }
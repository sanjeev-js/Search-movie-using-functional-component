import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// File Imoprts 
import MovieDetails from '../movieDetails/movieDetails';
import './searchlist.css';
import PassInputData from '../../context/input-data';

// SearchList component
const searchList = () => {

    // Urls for api request
    const searchMoviesUrl = 'https://api.themoviedb.org/3/search/movie?api_key=3583464c166eb3446babdeabbc188153&language=en-US&query=';
    const searchMoviesQueryString = '&page=1&include_adult=false';

    // Using state 
    const [ movies, setMovies ] = useState([]);
    const [ clicked, setClicked ] = useState(false);
    const [ movieId, setMovieId] = useState('');

    // Consuming context api 
    const inputContext = useContext(PassInputData);

    // Api calling for dipalying list of results 
    useEffect (()=>{
        axios.get( searchMoviesUrl + inputContext + searchMoviesQueryString)
        .then ((response)=>{
            setMovies(response.data.results)
        });
    }, [inputContext]);

    // Click handler
    const handleClick = (event, movieId) => {
        setClicked(true);
        setMovieId(movieId)
    };

    return (
        <div>
            <div className="leftcolumn">  
            {movies.length === 0 ? <div className="card">
                <h1>Invalid Search</h1>
            </div> : movies.map((movie)=>{
                return (
                    <div className ="card" key={movie.id} onClick={event => {handleClick(event, movie.id)}}>
                        <h1>{movie.title}</h1>
                        <p>{movie.overview}</p>
                    </div>
                )
            })}
            </div>
            {/* Passing movieId to context api so I can use it on movieDetails component */}
            {clicked ? <PassInputData.Provider value={movieId}>
                <MovieDetails />
            </PassInputData.Provider>
            : null}
        </div>
    )
};

export default searchList;
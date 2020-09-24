import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// File Imports
import './movieDetails.css';
import PassInputData from '../../context/input-data';

// Moviedetails component
const movieDetails = () => {

    // Variables for api calling 
    const movieDetailsUrl = 'https://api.themoviedb.org/3/movie/';
    const movieDetailsQueryString = '?api_key=3583464c166eb3446babdeabbc188153&language=en-US';
    const imageUrl = 'https://image.tmdb.org/t/p/w220_and_h330_face';

    // Using state
    const [ movieDetails, setMovieDetails ] = useState ([]);

    // Consuming context api 
    const movieId = useContext(PassInputData);

    // Api calling and getting data from server
    useEffect(()=>{
        axios.get( movieDetailsUrl + movieId + movieDetailsQueryString)
        .then((response) => {
            setMovieDetails(response.data)
        })
    }, [movieId]);

    return (
        // Displaying the Movie Details
        <div className ="rightcolumn">
            {movieDetails.title ? <div className ="Card">
                <img src = { imageUrl + movieDetails.poster_path } alt=""/>
                <h1> { movieDetails.title } </h1>
                <p><b>{ movieDetails.tagline }</b></p>
                <p> { movieDetails.overview } </p>
                <p>Released on : { movieDetails.release_date } </p>
            </div> : null}
            
        </div>
    )
};

export default movieDetails;
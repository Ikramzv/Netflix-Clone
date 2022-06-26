import React, { useEffect, useMemo, useState } from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'

const base_url = 'https://image.tmdb.org/t/p/original'

function Banner() {
    const [movie , setMovie] = useState([])

    const memoize = useMemo(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals).then((response) => {
                setMovie(response.data.results[Math.floor(Math.random() * response.data.results.length)])
            })
            return request
        }
        fetchData()
    } , [])

    useEffect(() => {
        return memoize
    },[])

    console.log(movie);

    return (
        <header className='banner_header' style={{backgroundImage: `url(${base_url}${movie.backdrop_path})`}} >
            <div className='banner_contents'>
                <h1>{movie?.title || movie?.name || movie?.original_name}</h1>

                <div className='banner_buttons' >
                    <button className='banner_button'>Play</button>
                    <button className='banner_button'>My List</button>
                </div>

                <h4>{movie?.overview}</h4>
            </div>
            <div className='banner_fadeBottom'></div>
        </header>
    )
}

export default Banner
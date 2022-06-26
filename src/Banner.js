import React, { useEffect, useMemo, useState } from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const base_url = 'https://image.tmdb.org/t/p/original'

function Banner() {
    const [trailerUrl , setTrailerUrl] = useState('')
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

    const handleClick = (movie) => {
        movieTrailer(movie?.name || movie?.title || movie?.original_name || '').then((url) => {
            const urlParams = new URLSearchParams(new URL(url).search)
            setTrailerUrl(urlParams.get('v'))
        }).catch((err) => {
            if(err) return alert(`${movie?.name || movie?.title || movie?.original_name || ''}'s trailer wasn't found`)
        })
    }

    const opts = {
        height: '400px' ,
        width: '100%' , 
        host: 'https://www.youtube.com' ,
        playerVars : {
            autoplay: 1,
            controls: 1,
            loop: 1
        }
    }

    return (
        <header className='banner_header' style={{backgroundImage: `${!trailerUrl ? `url(${base_url}${movie.backdrop_path})` : ''}`}} >
            {!trailerUrl ?  <>
                            <div className='banner_contents'>
                                <h1>{movie?.title || movie?.name || movie?.original_name}</h1>

                                <div className='banner_buttons' >
                                    <button className='banner_button' onClick={() => handleClick(movie)}>Play</button>
                                    <button className='banner_button'>My List</button>
                                </div>

                                <h4>{movie?.overview}</h4>
                            </div>
                            <div className='banner_fadeBottom'></div>
                            </> 
                            : 
                            <div className='banner_trailer_video'>
                                <YouTube videoId={trailerUrl} opts={opts} />
                                <div className='close_btn' onClick={() => setTrailerUrl('')} >CLOSE</div>
                            </div> }
        </header>
    )
}

export default Banner
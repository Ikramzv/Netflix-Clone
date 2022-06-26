import React, { useState , useEffect, useMemo } from 'react'
import axios from './axios'
import './Row.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const base_url = 'https://image.tmdb.org/t/p/original'


function Row({title , fetchUrl , isLargeRow}) {

    const [movies, setMovies] = useState([])
    const [trailerUrl , setTrailerUrl] = useState('')

    const memoize = useMemo(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl).then((response) => {
                setMovies(response.data.results)
            }) 
            return request
        } 
        fetchData()
    } , [movies , fetchUrl])

    useEffect(() => {
        return memoize        
    } , [fetchUrl])

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl('')
        }else {
            movieTrailer(movie?.name || movie?.title || movie?.original_title || '').then((url) => {
                console.log(url)
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get('v'))
            }).catch((err) => {
                if(err) {
                    return alert(`${movie?.name || movie?.title || movie?.original_title || ''}'s trailer wasn't found on Youtube `)
                }    
            })
        }
    }

    const opts = {
        height: '390',
        width: '100%',
        host: 'https://www.youtube.com' ,
        playerVars: {
            autoplay: 1
        }
    }

    return (
        <>
            <div className='row' >
                <h2 style={{textAlign: 'center'}} >{title}</h2>
                <div className='row_posters'>
                    {movies.map((movie) => {
                        return (
                            <img 
                            className={`row_poster ${isLargeRow && 'row_posterLarge'}`} 
                            key={movie.id}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                            alt={movie.name}
                            onClick={() => handleClick(movie)} />
                        )
                    })}
                </div>
                 { trailerUrl && <div className='trailer'><YouTube  videoId={trailerUrl} opts={opts} /></div> }
            </div> 
        </>
    )
}

export default Row
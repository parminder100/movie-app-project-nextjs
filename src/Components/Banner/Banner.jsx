"use client";
import dynamic from "next/dynamic";
import { fetchPopularMovies, showMovieTrailer } from "@/Utils/api/FetchApi";
import { useEffect, useState } from "react";
import "../Banner/Banner.css";
// import ReactPlayer from 'react-player';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const Banner = () =>{
    const [randomMovie, setRandomMovie] = useState([]);
    const [movieTrailer, setMovieTrailer] = useState([]);

    useEffect(()=>{
        const getRandomMovieTrailer = async() => {
            try{
                const data = await fetchPopularMovies();
                const movie = data.results;

                const randomIndex = Math.floor(Math.random() * movie.length);
                // console.log(randomIndex);
                const selectedMovie = movie[randomIndex]
                // console.log(selectedMovie);
                setRandomMovie(selectedMovie);

                const trailerData = await showMovieTrailer(selectedMovie.id);
                if(trailerData.results && trailerData.results.length > 0){
                    console.log(trailerData.results);
                    console.log(trailerData.results[0].key)
                    setMovieTrailer(trailerData.results[0].key);
                }
            }
            catch(error){
                console.error('Error fetching movie trailer');
            }
        }
        getRandomMovieTrailer();
    },[])
    return(
        <>
            <div className="pt-[61px]">
                {movieTrailer && (
                    <ReactPlayer 
                        url={`https://www.youtube.com/embed/${movieTrailer}`} 
                        width="100%"
                        height="56.25vw"
                        allowFullScreen
                        controls={false}
                        muted
                        style={{ width: "100vw", height: "56.25vw", maxWidth: "100%" }}
                    />
                )}
            </div>
        </>
    )
}
export default Banner;
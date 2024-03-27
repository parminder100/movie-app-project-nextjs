"use client";
import { showMovieTrailer } from "@/Utils/api/FetchApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import movie_trailer_close_btn from "../../../../public/img/movie_trailer_close_btn.svg";

const MoviesTrailer = ({onClose, movieTitle, movieId}) =>{
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(()=>{
        const getTrailer = async() =>{
            const data = await showMovieTrailer(movieId);
            if(data.results && data.results.length > 0){
                console.log(data.results[0].key);
                setTrailerKey(data.results[0].key);
            }
        }
        getTrailer();
    },[movieId]);

    const youtubeUrl = `https://www.youtube-nocookie.com/embed/${trailerKey}?privacy-enhanced=true`;
    return(
        <>
            <div className="absolute top-[100px] left-[0px] w-full flex items-center justify-center">
                <div>
                    <div className="flex justify-end mb-[15px]">
                        <Image onClick={onClose} className="w-[22px] h-[22px] cursor-pointer" src={movie_trailer_close_btn} alt="movie_trailer_close_btn" />
                    </div>
                    <div>
                        <iframe
                            width="560"
                            height="315"
                            src={youtubeUrl}
                            title={`${movieTitle} Trailer`}
                            frameBorder="0"
                            allowFullScreen
                            >  
                        </iframe>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MoviesTrailer;
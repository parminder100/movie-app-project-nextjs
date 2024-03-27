"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { showMovieDetails } from "@/Utils/api/FetchApi";
import Image from "next/image";
import language_icon from "../../../../public/img/language_icon.svg";
import timer_icon from "../../../../public/img/timer_icon.svg";
import { FormateRunTime } from "@/Components/Common/FormateRunTime/FormateRunTime";
import trailer_btn_play_icon from "../../../../public/img/trailer_btn_play_icon.svg";
import MoviesTrailer from "@/Components/Common/MoviesTrailer/MoviesTrailer";
import Header from "@/Components/Header/Header";

const MovieDetails = () =>{
    const {id} = useParams();
    const [movieDetails, setMovieDetails] = useState([]);
    const [trailerModalOpen, setTrailerModalOpen] = useState(false);

    useEffect(()=>{
        const getMovieDetails = async() =>{
            const data = await showMovieDetails(id);
            setMovieDetails(data);
            console.log(data);
        }
        getMovieDetails();
    },[id]);

    const movieBackgroundImage = {
        backgroundImage: `linear-gradient(rgba(16, 22, 36, 0.22) 0%, rgba(9, 12, 20, 0.9) 31.82%, rgb(14, 19, 32) 85.12%, rgb(17, 24, 39) 100%), url(https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% top',
        minHeight: '100vh'
    }

    const handleTrailerModal = () =>{
        setTrailerModalOpen(!trailerModalOpen);
    }

    const handleCloseTrailerModal = () =>{
        setTrailerModalOpen(false);
    }
    return(
        <>
            <Header />
            <div>
                {
                    movieDetails && (
                        <div style={movieBackgroundImage} onClick={handleTrailerModal}>
                            <div className={`flex max-w-[1280px] items-center gap-[56px] mx-auto pt-[100px]`}>
                                <div>
                                    <Image className="rounded-[8px]" width={320} height={100} src={`https://image.tmdb.org/t/p/original/${movieDetails?.poster_path}`} alt={movieDetails.title} />
                                </div>
                                <div className="max-w-[768px] w-[100%]">
                                    <p className="text-[#fff] text-[60px] font-[700] uppercase">{movieDetails.title}</p>
                                    <ul className="flex items-center gap-[10px] text-[#fff] mb-[15px]">
                                        {
                                            movieDetails.genres && movieDetails.genres.map((genre,index)=>(
                                                <li key={index} className="flex items-center gap-[10px]">
                                                    {genre.name}
                                                    {
                                                        index < movieDetails.genres.length - 1 && (
                                                            <span className="flex w-[4px] h-[4px] rounded-[50%] bg-[#fff]"></span>
                                                        )
                                                    }
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <div className="flex gap-[40px] mb-[15px] items-center">
                                        <div className="flex items-center gap-[10px]">
                                            <Image className="w-[24px] h-[24px]" src={language_icon} alt="language_icon" />
                                            <ul className="text-[#fff]">
                                                {
                                                    movieDetails.spoken_languages && movieDetails.spoken_languages.map((language,index)=>(
                                                        <li key={index}>
                                                            {language.name}
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                        <div className="flex gap-[10px] items-center">
                                            <Image className="w-[24px] h-[24px]" src={timer_icon} alt="timer_icon" />
                                            <p className="text-[#fff]">{FormateRunTime(movieDetails.runtime)}</p>
                                        </div>
                                    </div>
                                    <p className="mb-[20px] text-[#fff]">{movieDetails.overview}</p>
                                    <button onClick={handleTrailerModal} className="flex items-center gap-[10px] bg-[#ffee00] text-[#000] hover:scale-[1.1] px-[30px] py-[15px] rounded-[8px]">
                                        <Image className="w-[18px] h-[18px]" src={trailer_btn_play_icon} alt="trailer_btn_play_icon" />
                                        Watch Trailer
                                    </button>
                                    {trailerModalOpen && (
                                        <MoviesTrailer
                                            onClose={handleTrailerModal}
                                            movieTitle={movieDetails.title}
                                            movieId={id}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
export default MovieDetails;
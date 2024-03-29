"use client";
import dynamic from "next/dynamic";
import { fetchPopularMovies, showMovieTrailer  } from "@/Utils/api/FetchApi";
import { useEffect, useState } from "react";
import Link from "next/link";
import movie_paly_icon from "../../../public/img/movie_paly_icon.png";
import volume_icon from "../../../public/img/volume_icon.svg";
import volume_slash_icon from "../../../public/img/volume_slash_icon.svg";
import Image from "next/image";
// import ReactPlayer from "react-player";

const ReactPlayer = dynamic(()=>import('react-player'), {ssr:false});

const Banner = () =>{
    const [randomMovie, setRandomMovie] = useState([]);
    const [movieTrailer, setMovieTrailer] = useState([]);
    const [volumeClicked, setVolumeClicked] = useState(false);

    useEffect(()=>{
        const getRandomMovie = async() =>{
            try{
                const data = await fetchPopularMovies();
                const movie = data.results;

                const randomIndex = Math.floor(Math.random() * movie.length);
                // console.log(randomIndex);
                const selectedMovie = movie[randomIndex]
                console.log(selectedMovie);
                setRandomMovie(selectedMovie);

                const trailerData = await showMovieTrailer(selectedMovie.id)
                if(trailerData.results && trailerData.results.length > 0){
                    // console.log(trailerData.results);
                    // console.log(trailerData.results[0].key);
                    setMovieTrailer(trailerData.results[0].key);
                }
            }
            catch(error){
                console.error('Error fetching movie trailer');
            }
        }
        getRandomMovie();
    },[]);

    const handleVolumeButton = () =>{
        setVolumeClicked(!volumeClicked);
    }
    return(
        <>
            <div className="relative">
                {
                    movieTrailer && (
                        <ReactPlayer
                            url = {`https://www.youtube.com/embed/${movieTrailer}`}
                            width="100%"
                            height="56.25vw"
                            controls={false}
                            muted = {!volumeClicked}
                            volume = {1}
                            loop = {true}
                            playing = {true}
                            className="h-[56.25vw] max-md:!h-[80vw]"
                        />
                    )
                }
                <div className="absolute top-[250px] max-md:top-[80px] left-[30px] w-full max-w-[700px] max-md:max-w-[250px] max-md:left-[15px]">
                    {
                        randomMovie && (
                            <>
                                <p className="text-[60px] text-[#fff] max-md:text-[14px] max-md:font-[700]">{randomMovie.title}</p>
                                <p className="text-[#fff] text-[24px] leading-[33px] line-clamp-3 mt-[32px] max-md:mt-[5px] max-md:leading-[24px] max-md:text-[14px]">{randomMovie.overview}</p>
                                <div className="mt-[32px] max-md:mt-[10px]">
                                    <div className="flex items-center justify-between">
                                        <button className="bg-[#fff] text-[#000] font-[600] rounded-[4px] text-[28px] max-md:text-[14px] max-md:p-[8px] py-[8px] px-[16px]">
                                            <Link href={`/watch/${movieTrailer}`}>
                                                <div className="flex items-center gap-[20px]">
                                                    <Image className="w-[18px]" src={movie_paly_icon} alt="movie_paly_icon" />
                                                    <span>Play</span>
                                                </div>
                                            </Link>
                                        </button>
                                        <div className="w-[50px] h-[50px] max-md:w-[30px] max-md:h-[30px] flex items-center justify-center border-solid border-[1px] border-[#fff] rounded-[50%] cursor-pointer" onClick={handleVolumeButton}>
                                            {
                                                volumeClicked ? (
                                                    <Image className="w-[30px] max-md:w-[20px]" src={volume_icon} alt="volume_icon" />
                                                ):(
                                                    <Image className="w-[30px] max-md:w-[20px]" src={volume_slash_icon} alt="volume_slash_icon" />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}
export default Banner;
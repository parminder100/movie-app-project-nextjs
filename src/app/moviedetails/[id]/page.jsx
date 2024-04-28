"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { showMovieDetails } from "@/Utils/api/FetchApi";
import Image from "next/image";
import language_icon from "../../../../public/img/language_icon.svg";
import timer_icon from "../../../../public/img/timer_icon.svg";
import { FormateRunTime } from "@/Components/Common/FormateRunTime/FormateRunTime";
import trailer_btn_play_icon from "../../../../public/img/trailer_btn_play_icon.svg";
import like_icon from "../../../../public/img/like_icon.png";
import dislike_icon from "../../../../public/img/dislike_icon.png";
import dislike_filled_icon from "../../../../public/img/dislike_filled_icon.png";
import like_filled_icon from "../../../../public/img/like_filled_icon.png";
import MoviesTrailer from "@/Components/Common/MoviesTrailer/MoviesTrailer";
import Header from "@/Components/Header/Header";
import SimilarMovies from "@/Components/Common/SimilarMovies/SimilarMovies";

const MovieDetails = () =>{
    const [movieDetails, setMovieDetails] = useState([]);
    const [trailerModalOpen, setTrailerModalOpen] = useState(false);
    const [searchMovie, setSearchMovie] = useState("");
    const [likeCount, setLikeCount] = useState(0);
    const [showFilledLike, setShowFilledLike] = useState(false);
    const [showFilledDislike, setShowFilledDislike] = useState(false);
    const [showCommentsButton, setShowCommentsButton] = useState(false);
    const [getComments, setGetComments] = useState('');
    const [displayComments, setDisplayComments] = useState([]);
    const {id} = useParams();
    const trailerModal = useRef();
    const commentsButton = useRef();

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

    useEffect(()=>{
        const handleCloseTrailerModal = (event) =>{
            if(trailerModal.current && !trailerModal.current.contains(event.target)){
                setTrailerModalOpen(false);
            }
        }

        document.addEventListener('mousedown', handleCloseTrailerModal);

        return ()=>{
            document.removeEventListener('mousedown', handleCloseTrailerModal);
        }
    },[setTrailerModalOpen])

    const handleLikeCount = () =>{
        if(showFilledLike){
            setLikeCount(0);
        }
        else{
            setLikeCount(likeCount + 1);
        }
        setShowFilledLike(!showFilledLike);
    }

    const handleDislike = () =>{
        setShowFilledDislike(!showFilledDislike);
    }

    const handleCommentsButton = () =>{
        setShowCommentsButton(true);
    }

    useEffect(()=>{
        const handleCloseCommentsButton = (event) =>{
            if(commentsButton.current && !commentsButton.current.contains(event.target)){
                setShowCommentsButton(false);
            }
        }
        document.addEventListener('mousedown', handleCloseCommentsButton);
        return ()=>{
            document.removeEventListener('mousedown', handleCloseCommentsButton);
        }
    },[]);

    const handleCommentsCloseButton = () =>{
        setShowCommentsButton(false);
    }

    const handleGetComments = (e) =>{
        setGetComments(e.target.value);
    }

    const handleDisplayComments = () =>{
        if(getComments.trim() !== ""){
            setDisplayComments([...displayComments, getComments.trim()]);
            setGetComments('');
        }
    }
    return(
        <>
            <Header setSearchMovie={setSearchMovie} />
            <div>
                {
                    movieDetails && (
                        <>
                            <div style={movieBackgroundImage}>
                                <div className={`flex max-w-[1280px] items-center gap-[56px] mx-auto pt-[100px]`}>
                                    <div>
                                        <Image className="rounded-[8px]" width={320} height={100} src={`https://image.tmdb.org/t/p/original/${movieDetails?.poster_path}`} alt={movieDetails.title} />
                                    </div>
                                    <div className="max-w-[768px] w-[100%]">
                                        <p className="text-[#fff] text-[60px] font-[700] uppercase mb-[0px]">{movieDetails.title}</p>
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
                                                <ul className="text-[#fff] mb-[0px]">
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
                                                <p className="text-[#fff] mb-[0px]">{FormateRunTime(movieDetails.runtime)}</p>
                                            </div>
                                        </div>
                                        <p className="mb-[20px] text-[#fff]">{movieDetails.overview}</p>
                                        <button onClick={handleTrailerModal} className="flex items-center gap-[10px] bg-[#ffee00] text-[#000] hover:scale-[1.1] px-[30px] py-[15px] rounded-[8px]">
                                            <Image className="w-[18px] h-[18px]" src={trailer_btn_play_icon} alt="trailer_btn_play_icon" />
                                            Watch Trailer
                                        </button>
                                        <div className="flex items-center mt-[20px] gap-[20px] bg-[#272727] w-[max-content] rounded-[50px] py-[5px] px-[10px]">
                                            <div className="flex items-center gap-[8px] cursor-pointer after:content-[''] after:border-r-[1px] after:border-[#eee] after:h-[25px] after:ml-[10px]">
                                                {
                                                    !showFilledLike ? (
                                                        <Image className="w-[20px]" src={like_icon} alt="like_icon" onClick={handleLikeCount} />
                                                    ):(
                                                        <Image className="w-[20px]" src={like_filled_icon} alt="like_filled_icon" onClick={handleLikeCount} />
                                                    )
                                                }
                                                <p className="text-[#fff] text-[19px] mb-[0px]">{likeCount}</p>
                                            </div>
                                            <div className="cursor-pointer">
                                                {
                                                    !showFilledDislike ? (
                                                        <Image className="w-[20px]" src={dislike_icon} alt="dislike_icon" onClick={handleDislike} />
                                                    ):(
                                                        <Image className="w-[20px]" src={dislike_filled_icon} alt="dislike_filled_icon" onClick={handleDislike} />
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="mt-[20px]" ref={commentsButton}>
                                            <input type="text" value={getComments} className="w-full text-[#fff] bg-[transparent] border-b-[1px] border-[#fff] outline-none" placeholder="Add a comment..." onClick={handleCommentsButton} onChange={handleGetComments} />
                                            {
                                                showCommentsButton && (
                                                    <div className="flex items-center justify-end gap-[30px] mt-[20px]">
                                                        <button className="text-[#fff]" onClick={handleCommentsCloseButton}>Cancel</button>
                                                        <button className={`bg-[#6f6e6e] px-[10px] py-[5px] text-[#fff] rounded-[50px] ${getComments.length > 0 ? '':'opacity-[0.4]'}`} disabled={getComments.length === 0} onClick={handleDisplayComments}>Comment</button>
                                                    </div>
                                                )
                                            }
                                            <div className="mt-[20px]">
                                                {
                                                    displayComments.map((comment)=>(
                                                        <p className="text-[#fff] break-words">{comment}</p>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        {trailerModalOpen && (
                                            <div ref={trailerModal}>
                                                <MoviesTrailer
                                                    onClose={handleTrailerModal}
                                                    movieTitle={movieDetails.title}
                                                    movieId={id}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
            <SimilarMovies searchMovie={searchMovie} />
        </>
    )
}
export default MovieDetails;
"use client";
import { showSimilarMovies } from "@/Utils/api/FetchApi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";

const SimilarMovies = ({searchMovie}) =>{
    const [similarMoviesData, setSimilarMoviesData] = useState([]);
    const {id} = useParams();
    console.log(id)

    useEffect(()=>{
        const getSimilarMovies = async() =>{
            try{
                const data = await showSimilarMovies(id);
                setSimilarMoviesData(data.results);
                console.log(data.results);
            }
            catch(error){
                console.error('Error fetching similar movies', error);
            }
        }
        getSimilarMovies();
    },[]);

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    const filteredMovies = searchMovie ? similarMoviesData.filter((movie)=>movie.title.toLowerCase().includes(searchMovie.toLowerCase())) : similarMoviesData;
    return(
        <div className="pl-[34px] bg-[#111827]">
            <p className="text-[#fff] font-[600] text-[24px] mb-[18px]">Similar Movies</p>
            <Carousel responsive={responsive}>
                {
                    filteredMovies.map((movie,index)=>(
                        <Link key={index} href={`/moviedetails/${movie.id}`}>
                            <div className="mr-[15px]">
                                <Image className="rounded-[8px] w-full" sizes="50vw" width={0} height={0} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                                <div className="p-[10px]">
                                    <p className="text-[#fff] font-[600] mt-[15px]">{movie.title}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </Carousel>
        </div>
    )
}
export default SimilarMovies;
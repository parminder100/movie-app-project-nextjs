"use client";
import { useEffect, useState, useRef } from "react";
import { fetchPopularMovies } from "@/Utils/api/FetchApi";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../PopularMovies/PopularMovies.css";
import Link from "next/link";

const PopularMovies = ({searchMovie}) =>{
    const [moviesData, setMoviesData] = useState([]);
    const [carouselRef, setCarouselRef] = useState(null);

    useEffect(()=>{
        const getPopularMovies = async() =>{
            const data = await fetchPopularMovies();
            setMoviesData(data.results);
            console.log(data.results);
        }
        getPopularMovies();
    },[]);

    const filteredMovies = searchMovie ? moviesData.filter((movie)=>movie.title.toLowerCase().includes(searchMovie.toLowerCase())) : moviesData;

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

    useEffect(() => {
        // Scroll carousel to the center when searchMovie changes
        if (carouselRef && searchMovie) {
          const index = Math.floor(filteredMovies.length / 2);
          carouselRef.goToSlide(index, true);
        }
    }, [searchMovie, carouselRef, filteredMovies]);

    console.log('rerender popularMovies');
    return(
        <>
            <div className='pt-[100px] pl-[44px] bg-[#141414]'>
                <p className='mb-[15px] font-[600] text-[#fff] text-[30px]'>Popular Movies</p>
                <Carousel responsive={responsive} autoPlay={true} infinite={!searchMovie} ref={(ref) => setCarouselRef(ref)}>
                    {filteredMovies.map((movie, index) => (
                        <Link key={index} href={`/moviedetails/${movie.id}`}>
                            <div className='mr-[15px]'>
                                <Image className="w-full rounded-[5px]" width={0} height={0} draggable="false" sizes="50vw" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
                                <div className='p-[15px]'>
                                    <p className='text-[#fff] font-[600]'>{movie.title}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </Carousel>
            </div>
        </>
    )
}
export default PopularMovies;
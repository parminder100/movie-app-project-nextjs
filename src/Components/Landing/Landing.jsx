"use client";

import { useState } from "react";
import Banner from "../Banner/Banner";
import Header from "../Header/Header";
import PopularMovies from "../PopularMovies/PopularMovies";

const Landing = () =>{
    const [searchMovie, setSearchMovie] = useState("");
    // console.log('rerender landing component');
    return(
        <>
            <Header setSearchMovie={setSearchMovie} />
            <Banner />
            <PopularMovies searchMovie={searchMovie}/>
        </>
    )
}
export default Landing;
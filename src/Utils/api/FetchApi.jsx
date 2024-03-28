export const fetchPopularMovies = async() =>{
    const apiKey = process.env.NEXT_PUBLIC_NEXT_APP_API_KEY;
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error('Error fetching popular movies', error);
    }
}

export const showMovieDetails = async(id) =>{
    const apiKey = process.env.NEXT_PUBLIC_NEXT_APP_API_KEY;
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error('Error fetching movie details', error);
    }
}

export const showMovieTrailer = async(movieId) =>{
    const apiKey = process.env.NEXT_PUBLIC_NEXT_APP_API_KEY;
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error('Error fetching movie trailer', error);
    }
}

export const showSimilarMovies = async(id) =>{
    const apiKey = process.env.NEXT_PUBLIC_NEXT_APP_API_KEY;
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error('Error fetching similar movies', error);
    }
}
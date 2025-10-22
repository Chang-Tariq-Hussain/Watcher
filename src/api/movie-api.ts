import tmdb from "./tmdb";

export const getMoviesByCategory = async(category: string, page=1) => {
    try {
        const response = await tmdb.get(`/movie/${category}?page=${page}`)
        return response.data;
    } catch (error) {
        console.log("error>>>", error);
    }
}

export const getPopularMovies = async() => {
    try {
        const response = await tmdb.get('/movie/popular')
        return response.data;
    } catch (error) {
        console.log("error >>>", error);
    }
}

export const getNowPlayingMovies = async() => {
    try {
        const response = await tmdb.get('/movie/now_playing')
        return response.data;
    } catch (error) {
        console.log("error >>>", error);
    }
}

export const getTopRatedMovies = async() => {
    try {
        const response = await tmdb.get('/movie/top_rated')
        return response.data;
    } catch (error) {
        console.log("error >>>", error);
    }
}

export const getMovieById = async(movieId:number) => {
     try {
        const response = await tmdb.get(`/movie/${movieId}`)
        return response.data;
    } catch (error) {
        console.log("error >>>", error);
    }
}
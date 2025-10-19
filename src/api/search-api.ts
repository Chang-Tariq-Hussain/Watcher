import tmdb from "./tmdb";


export const searchMovies = async(keyword:string) => {
    try {
        const response = await tmdb.get(`/search/movie?query=${keyword}`)
        return response.data;
    } catch (error) {
        console.log("error >>>", error);
    }
}


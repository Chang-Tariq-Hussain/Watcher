import tmdb from "./tmdb";


export const searchMovies = async(keyword:string) => {
    try {
        const response = await tmdb.get(`/search/movie?query=${keyword}`)
        return response.data;
    } catch (error) {
        console.log("error >>>", error);
    }
}

export const searchMulti = async(query:string, page:number) => {
    try {
        const response = await tmdb.get(`/search/multi?query=${query}&page=${page}`)
        return response.data;
    } catch (error) {
        console.log("error >>>", error);
    }
}


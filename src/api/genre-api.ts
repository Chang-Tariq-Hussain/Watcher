import tmdb from "./tmdb";

export const getGenres = async() => {
    try {
        const response = await tmdb.get(`/genre/movie/list`)
        return response.data;
    } catch (error) {
        console.log("error>>>", error);
    }
}

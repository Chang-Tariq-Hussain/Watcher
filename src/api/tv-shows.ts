import tmdb from "./tmdb";

export const getTvShowsByCategory = async(category: string, page=1) => {
    try {
        const response = await tmdb.get(`/tv/${category}?page=${page}`)
        return response.data;
    } catch (error) {
        console.log("error>>>", error);
    }
}

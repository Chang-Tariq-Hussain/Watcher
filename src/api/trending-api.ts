
import tmdb from "./tmdb";

export const getTrendingAll = async(timeWindow: string, page: number) => {
    try {
        const response = await tmdb.get(`/trending/all/${timeWindow}?page=${page}`)
        return response.data;
    } catch (error) {
        console.log("error>>>", error);
    }
}

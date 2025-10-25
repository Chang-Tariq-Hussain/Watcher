import tmdb from "./tmdb";

export const getTvShowsByCategory = async(category: string, page=1) => {
    try {
        const response = await tmdb.get(`/tv/${category}?page=${page}`)
        return response.data;
    } catch (error) {
        console.log("error>>>", error);
    }
}


export const getTvShowById = async(id: number) => {
    try {
        const response = await tmdb.get(`/tv/${id}`)
        return response.data;
    } catch (error) {
        console.log("error>>>", error);
    }
}

export const getTvShowDetails= async(tvShowId:number) => {
     try {
        const response = await tmdb.get(`/tv/${tvShowId}`)
        return response.data;
    } catch (error) {
        console.log("error >>>", error);
    }
}


export const getTvShowVideosById = async(tvShowId:number) => {
     try {
        const response = await tmdb.get(`/tv/${tvShowId}/videos`)
        return response.data;
    } catch (error) {
        console.log("error >>>", error);
    }
}


export const getSimilarTvShows = async(tvShowId:number) => {
     try {
        const response = await tmdb.get(`/tv/${tvShowId}/similar`)
        return response.data;
    } catch (error) {
        console.log("error >>>", error);
    }
}
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASEURL;
const apiKey = import.meta.env.VITE_APIKEY;

export const getMovieList = async () => {
    try {
        const response = await axios.get(
            `${baseUrl}/movie/popular?api_key=${apiKey}`
        );
        return response.data.results;
    } catch (error) {
        console.error("Error fetching movie list:", error.message);  // Tampilkan error message
    }
}

export const searchMovie = async (q) => {
    const search = await axios.get(
        `${baseUrl}/search/movie?query=${q}&page=1&api_key=${apiKey}`
    )
    console.log(search.data.results);

    return search.data.results;
    
}

export const getDetailMovie = async (movie) => {
    const detailMovie = await axios.get(
        `${baseUrl}/movie/${collection_id}?language=en-US&api_key=${apiKey}'`
    )

    return detailMovie
}
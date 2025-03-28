import axios from 'axios';

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjdmNWM1OTNiNzVjMjQ4ZWZlZTkxN2YxNTFmNzk0ZSIsIm5iZiI6MTc0MzAzMjUyNC41ODA5OTk5LCJzdWIiOiI2N2U0OTBjYzVlOGU1YzliYWNiYTI0ZGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1pH90pKB-aD1D-wryI_oWYmY6sj5OwPHYe6NmcsR7w4"

const BASE_URL = "https://api.themoviedb.org/3";

const HEADERS = { Authorization: `Bearer ${API_KEY}` };

export async function getTrendingMovies() {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, { headers: HEADERS });
    return response.data.results;
};

export async function searchMovies(query) {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
        headers: HEADERS,
        params: {
            query,
            include_adult: false,
            language: 'en-US',
            page: 1,
        },
    });
    return response.data.results;
};

export async function getMovieCast(movieId) {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
        headers: HEADERS,
        params: {
            language: 'en-US',
        },
    });
    return response.data.cast;
};

export async function getMovieReviews(movieId) {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
        headers: HEADERS,
        params: {
            language: 'en-US',
            page: 1,
        },
    });
    return response.data.results;
};

export async function getMovieDetails(movieId) {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        headers: HEADERS,
        params: {
            language: 'en-US',
        },
    });
    return response.data;
};










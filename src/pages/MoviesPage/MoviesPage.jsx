import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const query = searchParams.get('query') || '';

    useEffect(() => {
        if (!query) return;

        async function fetchSearchMovies() {
            try {
                setLoading(true);
                const data = await searchMovies(query);
                setMovies(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchSearchMovies();
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchQuery = e.target.elements.query.value.trim();
        setSearchParams({ query: searchQuery });
    };

    return (
        <div className={css.moviesPageDiv}>
            <form onSubmit={handleSubmit}>
                <input type="text" name="query" placeholder="Search movies..." />
                <button className={css.searchBtn} type="submit">Search</button>
            </form>
            {loading && <p>Loading ...</p>}
            {error && <p>No movies found for your search : {error}</p>}
            {movies.length > 0 && <MovieList movies={movies} />}
        </div>
    );
};

export default MoviesPage
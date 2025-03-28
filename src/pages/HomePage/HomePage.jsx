import { useState, useEffect } from "react";
import { getTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import { FaArrowTrendUp } from "react-icons/fa6";
import css from './HomePage.module.css';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTrendingMovies() {
            try {
                setLoading(true);
                const data = await getTrendingMovies();
                setMovies(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchTrendingMovies();
    }, []);

    return (
        <div className={css.homePageDiv}>
            <h1 className={css.homeTitle}>Trending Today <FaArrowTrendUp /></h1>
            {loading && <p>Loading ...</p>}
            {error && <p>Oops! Something went wrong : {error}</p>}
            {movies.length > 0 && <MovieList movies={movies} />}
        </div>
    );
};

export default HomePage
import { useState, useEffect } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import { MdImageNotSupported } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
    const [movie, setMovie] = useState(null);
    const { movieId } = useParams();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

     const backLinkHref = location.state?.from || '/movies';

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                setLoading(true);
                const data = await getMovieDetails(movieId);
                setMovie(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchMovieDetails();
    }, [movieId]);

    if (!movie) {
        return <p>No movie details available.</p>;
    }

    const { title, poster_path, overview, genres, release_date } = movie;

    return (
        <div className={css.movieDetailsContainer}>
            <Link to={backLinkHref} className={css.goBack}> <FaArrowLeft size="24" /> {' '} Go Back </Link>
            {loading && <p>Loading movie details ...</p>}
            {error && <p>Oops! Something went wrong: {error}</p>}

            <div className={css.movieDetailsDiv}>
                {poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} className={css.moviePoster} />
                ) : (
                    <MdImageNotSupported size = "300" className={css.noPosterIcon} />
                )}

                <div className={css.movieInfoDiv}>
                    <h2>{title} ({release_date?.slice(0, 4)})</h2>
                    <p><b>Overview:</b> {overview}</p>
                    {genres?.length > 0 && (
                        <p>
                            <b>Genres:</b> {genres.map(genre => genre.name).join(', ')}
                        </p>
                    )}
                </div>
            </div>

            <div className={css.additionalDiv}>
                <h3 className={css.additionalHeader}>Additional information</h3>
                <ul>
                    <li>
                        <Link to="cast" className={css.additionalLink} state={{ from: backLinkHref }}>Cast</Link>
                    </li>
                    <li>
                        <Link to="reviews" className={css.additionalLink} state={{ from: backLinkHref }}>Reviews</Link>
                    </li>
                </ul>
            </div>
            <Outlet />
        </div>
    );
};

export default MovieDetailsPage
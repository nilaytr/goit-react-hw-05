import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMovieReviews() {
            try {
                setLoading(true);
                const data = await getMovieReviews(movieId);
                setReviews(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchMovieReviews();
    }, [movieId]);

    if (loading) {
        return <p>Loading reviews ...</p>;
    }

    if (error) {
        return <p>Oops! Something went wrong: {error}</p>;
    }

    if (reviews.length === 0) {
        return <p>No reviews available for this movie.</p>;
    }

    return (
        <>
            <ul className={css.reviewsList}>
                {reviews.map((review) => (
                    <li key={review.id} className={css.reviewsItem}>
                        <h4>Author: {review.author}</h4>
                        <p>{review.content}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default MovieReviews
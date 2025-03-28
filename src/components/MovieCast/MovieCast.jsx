import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../services/api';
import { FaUser } from "react-icons/fa";
import css from './MovieCast.module.css';

const MovieCast = () => {
    const [cast, setCast] = useState([]);
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMovieCast() {
            try {
                setLoading(true);
                const data = await getMovieCast(movieId);
                setCast(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchMovieCast();
    }, [movieId]);

    if (loading) {
        return <p>Loading cast ...</p>;
    }

    if (error) {
        return <p>Oops! Something went wrong: {error}</p>;
    }

    if (cast.length === 0) {
        return <p>No cast information available for this movie.</p>;
    }

    return (
        <>
            <ul className={css.castList}>
                {cast.map((actor) => (
                    <li key={actor.id} className={css.castItem}>
                        {actor.profile_path
                            ?
                            (<img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />)
                            :
                            <FaUser size={50} className={css.noImageIcon} title="No image available" />}
                        <p>{actor.name}</p>
                        <p>Character: {actor.character}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default MovieCast


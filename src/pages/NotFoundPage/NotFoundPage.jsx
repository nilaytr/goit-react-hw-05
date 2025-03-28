import { Link } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <div className={css.notFoundDiv}>
            <h1>404 Page Not Found</h1>
            <Link to="/">Go Back
                <HiArrowLeft size="24" />
            </Link>
        </div>
    );
};

export default NotFoundPage
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <div>
            <Link className={css.goBack} to="/">
                <FaArrowLeft size="24" className={css.icon} /> Go Back
            </Link>
            <h1 className={css.notFound} >404 Page Not Found</h1>
        </div>
    );
};

export default NotFoundPage
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const navLinkClass = ({ isActive }) => {
    return isActive ? css.active : css.link;
};

const Navigation = () => {
    return (
        <header>
            <nav>
                <NavLink to="/" className={navLinkClass}>Home</NavLink>
                <NavLink to="/movies" className={navLinkClass}>Movies</NavLink>
            </nav>
        </header>
    );
};

export default Navigation
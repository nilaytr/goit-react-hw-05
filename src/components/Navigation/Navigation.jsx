import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import { SiThemoviedatabase } from "react-icons/si";

const navLinkClass = ({ isActive }) => {
    return isActive ? css.active : css.link;
};

const Navigation = () => {
    return (
          <nav className={css.navigation}>
            <NavLink to="/" className={navLinkClass}>
                <SiThemoviedatabase className={css.icon} size="40" /> Home
            </NavLink>
            <NavLink to="/movies" className={navLinkClass}>Movies</NavLink>
        </nav>
    );
};

export default Navigation
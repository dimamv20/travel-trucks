import { NavLink } from "react-router-dom";
import css from "./Header.module.css";

const Header = () => {
  const getLinkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <header className={css.header}>
      <div className={css.container}>
        <NavLink to="/" className={css.logo}>
          TravelTrucks
        </NavLink>

        <nav className={css.nav}>
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>

          <NavLink to="/catalog" className={getLinkClass}>
            Catalog
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
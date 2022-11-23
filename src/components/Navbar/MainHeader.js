import { NavLink, Link } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = ({ logOutHandler, logIn }) => {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>CRYPToAPP</h1>

      {logIn && (
        <ul>
          <li>
            <NavLink
              activeClassName={classes.active}
              id={classes.coins}
              to="all-coins"
            >
              Search Coins
            </NavLink>
          </li>
          <li>
            <Link
              to="/log-in"
              onClick={logOutHandler}
              className={classes.active}
            >
              Log Out
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default MainHeader;

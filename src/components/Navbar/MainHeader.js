import { NavLink, Link } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = ({ logOutHandler, login }) => {
  return (
    <header className={classes.header}>
      <ul>
        <li>
          {!login && (
            <NavLink activeClassName={classes.active} to="/log-in">
              Log In
            </NavLink>
          )}
        </li>
      </ul>
      {login && (
        <ul>
          <li>
            <NavLink
              activeClassName={classes.active}
              id={classes.coins}
              to="/all-coins"
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

import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <ul>
        <li>
          <NavLink activeClassName={classes.active} to="/sign-in">
            Log In
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.active} to="/log-in">
            Sign up
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.active} to="/all-coins">
            Search Coins
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default MainHeader;

import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = ({ logOutHandler, logIn, getCurrency }) => {
  const [currency, setCurrency] = useState(false);

  const currencyHandler = () => {
    setCurrency((last) => !last);
    getCurrency(currency);
  };

  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>CRYPToAPP</h1>

      {logIn && (
        <ul>
          <select onChange={currencyHandler} className={classes.currency}>
            <option>USD</option>
            <option>EUR</option>
          </select>
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

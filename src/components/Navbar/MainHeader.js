import { useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = ({ logOutHandler, logIn }) => {
  const [headerCurrency, setHeaderCurrency] = useState("usd");
  const history = useHistory();

  const currencyHandler = (e) => {
    const currency = e.target.value.toLowerCase();
    setHeaderCurrency(currency);

    history.push(`/all-coins?currency=${currency}`);
  };

  console.log(headerCurrency);

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
            <NavLink id={classes.coins} to="/all-coins">
              Search Coins
            </NavLink>
          </li>
          <li>
            <Link to="/auth-registration-page" onClick={logOutHandler}>
              Log Out
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default MainHeader;

// import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = ({ logOutHandler, logIn, gotCurrency }) => {
  // const [menuOpen, setmenuOpen] = useState(false);

  const navigate = useNavigate();

  const currencyHandler = (e) => {
    const currency = e.target.value.toLowerCase();
    navigate(`/all-coins?currency=${currency}`);
    gotCurrency(currency);
  };

  // const setMenu = () => {
  //   setmenuOpen(!menuOpen);
  // };

  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>CRYPToAPP</h1>

      {logIn && (
        <div className={classes.bar}>
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
        </div>
      )}
    </header>
  );
};

export default MainHeader;

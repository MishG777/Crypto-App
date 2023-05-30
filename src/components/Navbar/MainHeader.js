import { memo, useState, useCallback, useEffect } from "react";
import { AiOutlineMenu, AiOutlineMinusCircle } from "react-icons/ai";
import { NavLink, Link, useLocation } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = ({ logOutHandler, logIn, gotCurrency }) => {
  const [menuOpen, setmenuOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(
    localStorage.getItem("selectedCurrency") || "usd"
  );

  const location = useLocation();

  const currencyHandler = useCallback(
    (e) => {
      let currency = e.target.value.toLowerCase();
      //navigate(`${location.pathname}?currency=${currency}`);
      setSelectedCurrency(currency);
      localStorage.setItem("selectedCurrency", currency);
      gotCurrency(currency);
    },
    [gotCurrency]
  );

  const openMenu = () => {
    setmenuOpen((prev) => !prev);
  };

  useEffect(() => {
    // Retrieve menuOpen state from localStorage
    const isMenuOpen = localStorage.getItem("menuOpen");
    setmenuOpen(isMenuOpen === "true");
  }, []);

  useEffect(() => {
    // Save menuOpen state to localStorage
    localStorage.setItem("menuOpen", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    // Set the selected currency in localStorage when it changes
    localStorage.setItem("selectedCurrency", selectedCurrency);
  }, [selectedCurrency]);

  if (!logIn) {
    localStorage.clear();
  }

  return (
    <header className={`${classes.header} ${menuOpen && classes.active}`}>
      <h1 className={`${!logIn && classes.logo}`}>CRYPToAPP</h1>

      {logIn && (
        <>
          <div>
            <ul className={classes.burgerNav}>
              <select
                onChange={currencyHandler}
                className={classes.currency}
                value={selectedCurrency}
              >
                <option onClick={openMenu} value="usd">
                  USD
                </option>
                <option onClick={openMenu} value="eur">
                  EUR
                </option>
              </select>
              <li onClick={openMenu}>
                <NavLink id={classes.coins} to="/all-coins">
                  Search Coins
                </NavLink>
              </li>
              <li onClick={openMenu}>
                <Link to="/auth-registration-page" onClick={logOutHandler}>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
          {menuOpen && (
            <AiOutlineMenu className={classes.burgerBar} onClick={openMenu} />
          )}
          {!menuOpen && (
            <AiOutlineMinusCircle
              className={classes.closeBurger}
              onClick={openMenu}
            />
          )}
        </>
      )}

      {!logIn && location.pathname === "/all-coins" && (
        <Link to="/auth-registration-page">Log in</Link>
      )}
    </header>
  );
};

export default memo(MainHeader);

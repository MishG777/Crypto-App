import { memo, useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineMinusCircle } from "react-icons/ai";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./MainHeader.module.css";
import { CryptoState } from "../context/CryptoContext";

const MainHeader = ({ logOutHandler, logIn }) => {
  const [menuOpen, setmenuOpen] = useState(false);
  const { currency, setcurrency } = CryptoState();

  const location = useLocation();
  const navigate = useNavigate();

  const currencyHandler = (e) => {
    let targetCurrency = e.target.value.toLowerCase();
    setcurrency(targetCurrency);
    localStorage.setItem("selectedCurrency", targetCurrency);
  };

  useEffect(() => {
    navigate(`${location.pathname}?currency=${currency}`);
  }, [location.pathname, currency, navigate]);

  const openMenu = () => {
    setmenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const isMenuOpen = localStorage.getItem("menuOpen");
    setmenuOpen(isMenuOpen === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("menuOpen", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    localStorage.setItem("selectedCurrency", currency);
  }, [currency]);

  return (
    <header className={`${classes.header} ${menuOpen && classes.active}`}>
      <h1 className={`${!logIn && classes.logo}`} onClick={() => navigate("/")}>
        CRYPToAPP
      </h1>

      {logIn && (
        <>
          <div>
            <ul className={classes.burgerNav}>
              <select
                onChange={currencyHandler}
                className={classes.currency}
                value={currency}
              >
                <option onClick={openMenu} value="usd">
                  USD
                </option>
                <option onClick={openMenu} value="eur">
                  EUR
                </option>
              </select>

              <li onClick={openMenu}>
                <NavLink id={classes.coins} to={"/all-coins" + location.search}>
                  Currencies
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

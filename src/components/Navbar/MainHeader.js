import { memo, useState, useCallback, useEffect } from "react";
import { AiOutlineMenu, AiOutlineMinusCircle } from "react-icons/ai";
import { NavLink, Link, useNavigate } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = ({ logOutHandler, logIn, gotCurrency }) => {
  const [menuOpen, setmenuOpen] = useState(false);

  const navigate = useNavigate();

  const currencyHandler = useCallback(
    (e) => {
      let currency = e.target.value.toLowerCase();
      navigate(`/all-coins?currency=${currency.toLowerCase()}`);
      gotCurrency(currency);
    },
    [navigate, gotCurrency]
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

  return (
    <header className={`${classes.header} ${menuOpen && classes.active}`}>
      <h1 className={!logIn && classes.logo}>CRYPToAPP</h1>

      {logIn && (
        <>
          <div>
            <ul className={classes.burgerNav}>
              <select onChange={currencyHandler} className={classes.currency}>
                <option onClick={openMenu}>USD</option>
                <option onClick={openMenu}>EUR</option>
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
    </header>
  );
};

export default memo(MainHeader);

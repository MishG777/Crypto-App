import { NavLink, Link, useHistory } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = ({ logOutHandler, logIn }) => {
  // const [currency, setCurrency] = useState("");

  const history = useHistory();

  const currencyHandler = (e) => {
    const currency = e.target.value.toLowerCase();

    history.push(`/all-coins?currency=${currency}`);
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

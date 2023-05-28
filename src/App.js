import React, { Fragment, useState, useEffect } from "react";

import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import CoinDetails from "./components/EachCoinDetails/CoinDetails";
import Coins from "./components/Coins";
import MainHeader from "./components/Navbar/MainHeader";
import NotFound from "./components/NotFound";

import LogIn from "./components/UserLogging/LogIn";

function App() {
  const [logIn, setLogin] = useState(false);
  const [cur, setCur] = useState("usd");
  const location = useLocation();

  const OnLogInPage = location.pathname === "/auth-registration-page";
  const navigate = useNavigate();

  const mainCurrencyGot = (currency) => {
    navigate(`${location.pathname}?currency=${currency}`);
    setCur(currency);
  };

  useEffect(() => {
    const CryptoPage = localStorage.getItem("CryptoPage");

    if (CryptoPage === "2") {
      setLogin(true);
    }
    if (OnLogInPage) {
      setLogin(false);
      localStorage.setItem("CryptoPage", 1);
    }
    return () => {
      console.log("cleared");
    };
  }, [OnLogInPage]);

  const logOutHandler = () => {
    setLogin(false);
    localStorage.clear();
  };

  const logInHandler = () => {
    localStorage.setItem("CryptoPage", "2");
    setLogin(true);
    navigate(`/all-coins`);
  };

  return (
    <Fragment>
      <header>
        <MainHeader
          logOutHandler={logOutHandler}
          logIn={logIn}
          gotCurrency={mainCurrencyGot}
        />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/all-coins" />}></Route>

          <Route path="/all-coins" element={<Coins currency={cur} />}></Route>

          <Route path="/all-coins/:details" element={<CoinDetails />}></Route>
          <Route
            path="/auth-registration-page"
            element={<LogIn logInHandler={logInHandler} />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;

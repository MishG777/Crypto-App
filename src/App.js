import React, { Fragment, useState, useEffect } from "react";

import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import CoinDetails from "./components/eachdetails/CoinDetails";
import Coins from "./components/Coins";
import MainHeader from "./components/Navbar/MainHeader";
import NotFound from "./components/NotFound";
import LogIn from "./components/UserLogging/LogIn";
//import RootLayout from "./components/RootLayout";

//import { createBrowserRouter, RouterProvider } from "react-router-dom";

//const router = createBrowserRouter([
//  {
//    path: "",
//    element: <RootLayout />,
//    errorElement: <NotFound />,
//    children: [
//      { path: "all-coins", element: <Coins /> },
//      { path: "all-coins/:details", element: <CoinDetails /> },
//      {
//        path: "/auth-registration-page",
//        element: <LogIn logInHandler={logInHandler} />,
//      },
//    ],
//  },
//]);

function App() {
  const [logIn, setLogin] = useState(false);
  const location = useLocation();

  const OnLogInPage = location.pathname === "/auth-registration-page";
  const navigate = useNavigate();

  useEffect(() => {
    const CryptoPage = localStorage.getItem("CryptoPage");

    if (CryptoPage === "2") {
      setLogin(true);
    }
    if (OnLogInPage) {
      setLogin(false);
      localStorage.setItem("CryptoPage", 1);
    }
  }, [OnLogInPage]);

  const logInHandler = () => {
    localStorage.setItem("CryptoPage", "2");
    setLogin(true);
    navigate(`/all-coins`);
  };

  const logOutHandler = () => {
    setLogin(false);
    localStorage.clear();
  };

  return (
    <Fragment>
      <header>
        <MainHeader logOutHandler={logOutHandler} logIn={logIn} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/all-coins" />}></Route>

          <Route path="/all-coins" element={<Coins />}></Route>

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

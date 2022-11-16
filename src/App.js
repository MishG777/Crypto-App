import React, { Fragment, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import CoinDetails from "./components/CoinDetails";
import Coins from "./components/Coins";
import MainHeader from "./components/Navbar/MainHeader";
import LogIn from "./components/UserLogging/LogIn";

function App() {
  const [login, setLogin] = useState(false);
  const history = useHistory();

  const logOutHandler = () => {
    setLogin(false);
  };

  const logInHandler = () => {
    setLogin(true);
    history.push("/all-coins");
  };

  return (
    <Fragment>
      <header>
        <MainHeader logOutHandler={logOutHandler} login={login} />
      </header>
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/log-in" />
          </Route>

          <Route path="/all-coins" exact>
            {login && <Coins />}
          </Route>
          <Route path="/all-coins/:coins">
            <CoinDetails />
          </Route>
          <Route path="/log-in">
            {!login && <LogIn logInHandler={logInHandler} />}
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;

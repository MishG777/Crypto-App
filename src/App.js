import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CoinDetails from "./components/CoinDetails";
import Coins from "./components/Coins";
import MainHeader from "./components/Navbar/MainHeader";

function App() {
  return (
    <Fragment>
      <header>
        <MainHeader />
      </header>
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/all-coins" />
          </Route>
          <Route path="/all-coins" exact>
            <Coins />
          </Route>
          <Route path="/all-coins/:coins">
            <CoinDetails />
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;

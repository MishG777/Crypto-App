import React from "react";
import classes from "./CoinsTopBar.module.css";

//used in Coins.js
function CoinsTopBar() {
  return (
    <div className={classes["coin-container1"]}>
      <div className={classes["coin-data1"]}>
        <p className={classes.name}>Coin</p>

        <p className={classes.rank1}>#</p>

        <p>Price</p>

        {/*<p>Market Cap</p>*/}

        <p className={classes.changes}>Changes</p>
      </div>
    </div>
  );
}

export default CoinsTopBar;

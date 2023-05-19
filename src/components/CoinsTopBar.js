import React from "react";
import classes from "./CoinsTopBar.module.css";

function CoinsTopBar() {
  return (
    <div className={classes["coin-container1"]}>
      <p>symbol</p>
      <div className={classes["coin-data1"]}>
        <p className={classes.name}>name</p>
        <div className={classes["inner-data1"]}>
          <h6 className={classes.rank}>
            <span>rank: </span>1
          </h6>
          <p className={classes.symbol}>name</p>

          <p>price</p>

          <p>Market Cap</p>

          <p>changes</p>
        </div>
      </div>
    </div>
  );
}

export default CoinsTopBar;

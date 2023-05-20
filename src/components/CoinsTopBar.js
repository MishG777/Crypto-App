import React from "react";
import classes from "./CoinsTopBar.module.css";

function CoinsTopBar() {
  return (
    <div className={classes["coin-container1"]}>
      <p>symbol</p>
      <div className={classes["coin-data1"]}>
        <p className={classes.name}>name</p>
        <div className={classes["inner-data1"]}>
          <p className={classes.rank1}>rank</p>

          <p>price</p>

          <p>Market Cap</p>

          <p className={classes.changes}>changes</p>
        </div>
      </div>
    </div>
  );
}

export default CoinsTopBar;

import React from "react";
import classes from "./CoinItems.module.css";

const CoinItems = ({ image, name, symbol, current_price, market_cap }) => {
  return (
    <div className={classes["coin-container"]}>
      <img src={image} alt="crypto" />

      <div className={classes["coin-data"]}>
        <h4>{name}</h4>
        <div className={classes["inner-data"]}>
          <p>symbol: {symbol}</p>
          <p>Price: ${current_price}</p>
          <p>MC: ${market_cap.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CoinItems;

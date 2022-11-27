import React from "react";
import classes from "./CoinItems.module.css";
import { Link } from "react-router-dom";

const CoinItems = ({
  image,
  name,
  symbol,
  current_price,
  market_cap,
  market_cap_rank,
  currency,
}) => {
  return (
    <Link to={`/all-coins/${name}`} className={classes["coin-container"]}>
      <img src={image} alt="crypto" />

      <div className={classes["coin-data"]}>
        <h4>{name}</h4>
        <div className={classes["inner-data"]}>
          <p className={classes.rank}>rank: {market_cap_rank}</p>
          <p>symbol: {symbol.toUpperCase()}</p>
          <p>{`Price: ${currency ? "$" : "€"}${current_price}`}</p>
          <p>{`MC: ${currency ? "$" : "€"}${market_cap.toLocaleString()}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default CoinItems;

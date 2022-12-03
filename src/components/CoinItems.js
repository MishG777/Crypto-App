import React, { useEffect, useState } from "react";
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
  market_cap_change_percentage_24h,
}) => {
  const [percent, setPercent] = useState(false);
  let currencyLogo = "$ ";
  if (currency === "usd") {
    currencyLogo = "$ ";
  }

  if (currency === "eur") {
    currencyLogo = "€ ";
  }

  useEffect(() => {
    if (market_cap_change_percentage_24h > 0) {
      setPercent(true);
    }
    if (market_cap_change_percentage_24h < 0) {
      setPercent(false);
    }
  }, [market_cap_change_percentage_24h]);

  return (
    <Link to={`/all-coins/${name}`} className={classes["coin-container"]}>
      <img src={image} alt="crypto" />

      <div className={classes["coin-data"]}>
        <h4>{name}</h4>
        <div className={classes["inner-data"]}>
          <p className={classes.rank}>rank: {market_cap_rank}</p>
          <p>symbol: {symbol.toUpperCase()}</p>
          <p>{`Price: ${currencyLogo} ${current_price}`}</p>
          <p>{`MC: ${currencyLogo}${market_cap.toLocaleString()}`}</p>
          <p
            className={`${percent ? classes.green : classes.red}`}
          >{`24H:  ${market_cap_change_percentage_24h}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default CoinItems;

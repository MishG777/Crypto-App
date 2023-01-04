import React, { useEffect, useState } from "react";
import classes from "./CoinItems.module.css";
import { Link } from "react-router-dom";
import { useCallback } from "react";

const CoinItems = ({
  image,
  name,
  symbol,
  current_price,
  market_cap,
  market_cap_rank,
  currency,

  priceChangeTime,
  price_change_percentage_1h_in_currency,
  price_change_percentage_24h_in_currency,
  price_change_percentage_7d_in_currency,
  price_change_percentage_14d_in_currency,
  price_change_percentage_30d_in_currency,
  price_change_percentage_200d_in_currency,
  price_change_percentage_1y_in_currency,
}) => {
  const [percent, setPercent] = useState(false);
  const [logoCurrency, setlogoCurrency] = useState(false);
  const [percentByTime, setPercentByTime] = useState(
    price_change_percentage_24h_in_currency
  );

  const timeChanger = {
    H1: +price_change_percentage_1h_in_currency,
    H24: +price_change_percentage_24h_in_currency,
    D7: +price_change_percentage_7d_in_currency,
    D14: +price_change_percentage_14d_in_currency,
    D30: +price_change_percentage_30d_in_currency,
    D200: +price_change_percentage_200d_in_currency,
    Y1: +price_change_percentage_1y_in_currency,
  };

  const currencyChangerFn = useCallback(() => {
    if (currency === "usd") {
      setlogoCurrency(true);
    } else {
      setlogoCurrency(false);
    }
  }, [currency]);

  const PriceAndTimeChanger = useCallback(() => {
    if (
      timeChanger.H1 > 0 ||
      timeChanger.H24 > 0 ||
      timeChanger.D7 > 0 ||
      timeChanger.D14 > 0 ||
      timeChanger.D30 > 0 ||
      timeChanger.D200 > 0 ||
      timeChanger.Y1 > 0
    ) {
      setPercent(true);
    } else {
      setPercent(false);
    }

    let tm;

    if (priceChangeTime === "1h") {
      tm = timeChanger.H1.toFixed(3);
    } else if (priceChangeTime === "24h") {
      tm = timeChanger.H24.toFixed(3);
    } else if (priceChangeTime === "7d") {
      tm = timeChanger.D7.toFixed(3);
    } else if (priceChangeTime === "14d") {
      tm = timeChanger.D14.toFixed(3);
    } else if (priceChangeTime === "30d") {
      tm = timeChanger.D30.toFixed(3);
    } else if (priceChangeTime === "200d") {
      tm = timeChanger.D200.toFixed(3);
    } else if (priceChangeTime === "1y") {
      tm = timeChanger.Y1.toFixed(3);
    }
    if (percentByTime === "NaN" || percentByTime === "undefined") {
      tm = "...";
    }

    setPercentByTime(tm);
  }, [
    percentByTime,
    priceChangeTime,
    timeChanger.H1,
    timeChanger.H24,
    timeChanger.D7,
    timeChanger.D14,
    timeChanger.D30,
    timeChanger.D200,
    timeChanger.Y1,
  ]);

  useEffect(() => {
    currencyChangerFn();
    PriceAndTimeChanger();
  }, [currencyChangerFn, PriceAndTimeChanger]);

  return (
    <Link to={`${name}`} className={classes["coin-container"]}>
      <img src={image} alt="crypto" />

      <div className={classes["coin-data"]}>
        <h4 className={classes.name}>{name}</h4>
        <div className={classes["inner-data"]}>
          <p className={classes.rank}>
            <span>rank: </span>
            {market_cap_rank}
          </p>
          <p className={classes.symbol}> {symbol.toUpperCase()}</p>

          <p>
            <span>Price: </span>
            {`${logoCurrency ? "$" : "€"}${current_price}`}
          </p>

          <p>
            <span>MC: </span>
            {`${logoCurrency ? "$" : "€"}${market_cap.toLocaleString()} `}
          </p>

          <p className={`${percent ? classes.green : classes.red}`}>
            <span>{priceChangeTime}: </span>
            {` ${percentByTime} %`}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(CoinItems);

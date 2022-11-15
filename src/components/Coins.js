import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinItems from "./CoinItems";
import classes from "./Coins.module.css";
import loader from "../components/img/loading.png";

const URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

function Coins() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(URL)
      .then((res) => {
        const CoinsData = res.data;
        setCoins(CoinsData);
        console.log(CoinsData);
      })
      .catch((error) => console.log(error));
    setIsLoading(false);
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={classes.main}>
      <div className={classes["coin-search"]}>
        <h1 className={classes["coin-text"]}>Search a Currency</h1>
        <form>
          <input
            type="search"
            placeholder="Search for Crypto Currencies"
            className={classes["coin-input"]}
            onChange={handleChange}
          />
        </form>
      </div>
      {isLoading && (
        <img src={loader} alt="loading..." className={classes.loader} />
      )}

      {!isLoading && (
        <div className={classes["all-coins"]}>
          {filteredCoins.map((coin) => {
            return <CoinItems key={coin.id} {...coin} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Coins;

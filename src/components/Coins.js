import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinItems from "./CoinItems";
import classes from "./Coins.module.css";
import loader from "../components/img/loading.png";
import { CoinPages } from "./CoinPages";

function Coins() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const [fetchedCoinsAmount, setFetchedCoinsAmount] = useState(125);
  const [noMoreCoins, setNoMoreCoins] = useState(false);

  const [fetchNextPage, setFetchNextPage] = useState(1);
  const [secondPageFetched, setSecondPageFetched] = useState(false);

  let URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${fetchedCoinsAmount}&page=${fetchNextPage}&sparkline=false`;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    axios
      .get(URL)
      .then((res) => {
        const CoinsData = res.data;
        setCoins(CoinsData);
        console.log(CoinsData);
      })
      .catch((error) => setError(error.message));
    setIsLoading(false);
  }, [URL]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  //===================FETCH MORE COINS

  const fetchMoreCoins = () => {
    setIsLoading(true);
    setFetchedCoinsAmount((moreCoins) => moreCoins + moreCoins * 2);
    console.log(fetchedCoinsAmount);
    if (fetchedCoinsAmount > 250) {
      setNoMoreCoins(true);

      console.log("No more Coins to Fetch");
    }
    setIsLoading(false);
  };

  //=================== FETCH NEXT PAGE

  const fetchSecondPageHandler = () => {
    setFetchNextPage((nextPage) => nextPage + 1);
    setSecondPageFetched(true);
  };

  //================= PREVIOUS PAGE

  const prevousPageHandler = () => {
    setFetchNextPage((nextPage) => nextPage - 1);
    console.log(fetchNextPage);
    if (fetchNextPage <= 0) {
      console.log("no more pages back");
    }
  };

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
      {!isLoading && coins.length > 0 && (
        <div className={classes["all-coins"]}>
          {filteredCoins.map((coin) => {
            return <CoinItems key={coin.id} {...coin} />;
          })}
        </div>
      )}
      {!noMoreCoins && <button onClick={fetchMoreCoins}>fetch more</button>}

      {noMoreCoins && (
        <div>
          {!secondPageFetched && <h4>No more coins to fetch!</h4>}
          {secondPageFetched && (
            <button onClick={prevousPageHandler}>previous page</button>
          )}
          <button onClick={fetchSecondPageHandler}>go to next page</button>
        </div>
      )}

      <CoinPages setFetchNextPage={setFetchNextPage} />

      {isLoading && (
        <img src={loader} alt="loading..." className={classes.loader} />
      )}
      <h2 className={classes.error}>{error}</h2>
    </div>
  );
}

export default Coins;

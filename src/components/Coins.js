import React, { useState, useEffect, Fragment, useCallback } from "react";
import axios from "axios";
import CoinItems from "./CoinItems";
import classes from "./Coins.module.css";
import loader from "../components/img/loading.png";
import { CoinPages } from "./Footer/CoinPages";
import Button from "./UI/Button";
import { useHistory, useLocation } from "react-router-dom";

function Coins() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const [fetchedCoinsAmount, setFetchedCoinsAmount] = useState(125);
  const [noMoreCoins, setNoMoreCoins] = useState(false);

  const [fetchNextPage, setFetchNextPage] = useState(1);
  const [secondPageFetched, setSecondPageFetched] = useState(false);

  const history = useHistory();
  const location = useLocation();

  let URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${fetchedCoinsAmount}&page=${fetchNextPage}&sparkline=false`;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    axios
      .get(URL)
      .then((res) => {
        const CoinsData = res.data;
        setCoins(CoinsData);
        // console.log(CoinsData);
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
    if (fetchedCoinsAmount > 250) {
      setNoMoreCoins(true);
    }
    setIsLoading(false);
  };

  const showPagesNumHandler = useCallback(
    (page) => {
      history.push(`/all-coins?page=${page}`);
      if (fetchNextPage) {
        history.push(`/all-coins?page=${fetchNextPage}`);
      }
    },
    [history, fetchNextPage]
  );
  useEffect(() => {
    showPagesNumHandler();
  }, [showPagesNumHandler, history, location.search]);

  //=================== FETCH NEXT PAGE

  const fetchSecondPageHandler = () => {
    setIsLoading(true);
    // history.push(`/all-coins?page=${fetchNextPage}`);
    showPagesNumHandler();
    setFetchNextPage((nextPage) => nextPage + 1);
    setSecondPageFetched(true);
    setIsLoading(false);
  };

  //================= PREVIOUS PAGE

  const prevousPageHandler = () => {
    setIsLoading(true);
    // history.push(`/all-coins?page=${fetchNextPage}`);
    showPagesNumHandler();
    setFetchNextPage((nextPage) => nextPage - 1);
    // console.log(fetchNextPage);
    if (fetchNextPage <= 1) {
      fetchSecondPageHandler();
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
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
        {!noMoreCoins && <Button onClick={fetchMoreCoins}>fetch more</Button>}

        {noMoreCoins && (
          <div>
            {!secondPageFetched && (
              <h4 className={classes.noMoreFetch}>No more coins to fetch!</h4>
            )}
            {secondPageFetched && (
              <Button onClick={prevousPageHandler}>previous page</Button>
            )}
            <Button onClick={fetchSecondPageHandler}>go to next page</Button>
          </div>
        )}

        {isLoading && (
          <img src={loader} alt="loading..." className={classes.loader} />
        )}
        <h2 className={classes.error}>{error}</h2>
      </div>
      <CoinPages
        showPagesNumHandler={showPagesNumHandler}
        setFetchNextPage={setFetchNextPage}
      />
    </Fragment>
  );
}

export default Coins;

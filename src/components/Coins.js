import React, {
  useState,
  useEffect,
  Fragment,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import CoinItems from "./CoinItems";
import classes from "./Coins.module.css";
import loader from "../components/img/loading.png";
import { CoinPages } from "./Footer/CoinPages";
import Button from "./UI/Button";
import { useNavigate, useLocation } from "react-router-dom";
import PriceChangeByTime from "./PriceChangeByTime";
import CoinsTopBar from "./CoinsTopBar";

function Coins({ currency }) {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const [fetchedCoinsAmount, setFetchedCoinsAmount] = useState(10);

  const [noMoreCoins, setNoMoreCoins] = useState(false);

  const [fetchNextPage, setFetchNextPage] = useState(1);
  const [secondPageFetched, setSecondPageFetched] = useState(false);

  const [priceChangeTime, setpriceChangeTime] = useState("24h");

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const mcSorting = queryParams.get("McSort") === "asc";

  let URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_${
    mcSorting ? "asc" : "desc"
  }&per_page=${fetchedCoinsAmount}&page=${fetchNextPage}&sparkline=false&price_change_percentage=${priceChangeTime}`;
  //1h, 24h, 7d, 14d, 30d, 200d, 1y

  //-----------------Keep entered data

  useEffect(() => {
    const searchText = JSON.parse(localStorage.getItem("searchedData"));
    if (searchText !== null || searchText !== "") {
      setSearch(searchText);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchedData", JSON.stringify(search));
  }, [search]);

  //------------------------------------ fetching coins

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const timerId = setTimeout(() => {
      axios
        .get(URL)
        .then((res) => {
          const CoinsData = res.data;

          setCoins(CoinsData);

          // console.log(CoinsData);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error.message);
        });
    }, 2000); // 2 second delay

    return () => clearTimeout(timerId);
  }, [URL]);

  const handleChange = (e) => {
    if (e.target.value !== null) {
      setSearch(e.target.value);
    } else {
      console.log(error);
    }
  };

  const filteredCoins = useMemo(() => {
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(search?.toLowerCase() || "")
    );
  }, [coins, search]);

  //===================FETCH MORE COINS

  const fetchMoreCoins = useCallback(() => {
    setIsLoading(true);
    setFetchedCoinsAmount((moreCoins) => moreCoins + moreCoins * 2);
    if (fetchedCoinsAmount > 250) {
      setNoMoreCoins(true);
    }
    setIsLoading(false);
  }, [fetchedCoinsAmount]);

  const showPagesNumHandler = (page) => {
    navigate(`/all-coins?page=${page}`);
  };

  //=================== FETCH NEXT PAGE

  const fetchSecondPageHandler = useCallback(() => {
    setIsLoading(true);
    setFetchNextPage((nextPage) => nextPage + 1);
    const nextPage = fetchNextPage + 1;
    navigate(`/all-coins?page=${nextPage}`);

    setSecondPageFetched(true);
    setIsLoading(false);
  }, [fetchNextPage, navigate]);

  //================= PREVIOUS PAGE

  const previousPageHandler = useCallback(() => {
    setIsLoading(true);
    setFetchNextPage((nextPage) => nextPage - 1);
    const prevPage = fetchNextPage - 1;
    navigate(`/all-coins?page=${prevPage}`);
    setIsLoading(false);
  }, [fetchNextPage, navigate]);

  //==================== SORT BY MARKET CAP

  const sortByMcHandler = useCallback(() => {
    navigate(`${location.pathname}?McSort=${mcSorting ? "desc" : "asc"}`);
  }, [location.pathname, mcSorting, navigate]);

  //========================== GOT TIME FOR price_change_percentage in API

  const gotTimeHandler = useCallback((time) => {
    setpriceChangeTime(time);
  }, []);

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
              value={search ? search : ""}
            />
          </form>
        </div>
        <div>
          <Button onClick={sortByMcHandler}>
            Sort MC by {mcSorting ? "Ascending ⇧" : "Descending ⇩"}
          </Button>

          <PriceChangeByTime changedTime={gotTimeHandler} />
        </div>

        {isLoading && (
          <img src={loader} alt="loading..." className={classes.loader} />
        )}
        {!isLoading && coins.length > 0 && (
          <div className={classes["all-coins"]}>
            {/*<div className={classes.bar}>
              <h3>Symbol</h3>
              <h3>Coin</h3>
              <h3>Price</h3>
              <h3>Market Cap</h3>
              <h3>Price Volume {priceChangeTime}</h3>
            </div>*/}
            <CoinsTopBar />
            {filteredCoins.map((coin) => {
              return (
                <CoinItems
                  currency={currency}
                  key={coin.id}
                  {...coin}
                  priceChangeTime={priceChangeTime}
                />
              );
            })}
          </div>
        )}
        {!noMoreCoins && <Button onClick={fetchMoreCoins}>fetch more</Button>}

        {noMoreCoins && (
          <div>
            {!secondPageFetched && (
              <h4 className={classes.noMoreFetch}>No more coins to fetch!</h4>
            )}
            {secondPageFetched && fetchNextPage > 1 && (
              <Button onClick={previousPageHandler}>previous page</Button>
            )}
            <Button onClick={fetchSecondPageHandler}>go to next page</Button>
          </div>
        )}

        {error && <h2 className={classes.error}>{error}</h2>}
      </div>
      <CoinPages
        showPagesNumHandler={showPagesNumHandler}
        setFetchNextPage={setFetchNextPage}
      />
    </Fragment>
  );
}

export default Coins;

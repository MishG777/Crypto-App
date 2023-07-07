import React, {
  useState,
  useEffect,
  Fragment,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import CoinItems from "./CoinItems";
import classes from "./Coins.module.css";
import loader from "../components/img/loading.png";
import CoinPages from "./Footer/CoinPages";
import Button from "./UI/Button";
import { useNavigate, useLocation } from "react-router-dom";
import PriceChangeByTime from "./PriceChangeByTime";
import CoinsTopBar from "./CoinsTopBar";
import { CryptoState } from "./context/CryptoContext";
import Banner from "./banner/Banner";

function Coins() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [fetchedCoinsAmount, setFetchedCoinsAmount] = useState(25);

  const [noMoreCoins, setNoMoreCoins] = useState(false);

  const [fetchNextPage, setFetchNextPage] = useState(1);
  const [secondPageFetched, setSecondPageFetched] = useState(false);

  const [priceChangeTime, setpriceChangeTime] = useState("24h");

  //context
  const { currency } = CryptoState();

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
    const timerId = setTimeout(() => {
      axios
        .get(URL)
        .then((res) => {
          const CoinsData = res.data;

          setCoins(CoinsData);

          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error.message);
        });
    }, 1000); // 1 second delay

    return () => clearTimeout(timerId);
  }, [URL]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = useMemo(() => {
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(search?.toLowerCase() || "")
    );
  }, [coins, search]);

  //===================FETCH MORE COINS

  const fetchMoreCoins = () => {
    setIsLoading(true);
    setFetchedCoinsAmount((moreCoins) => moreCoins + 25);
    if (fetchedCoinsAmount > 250) {
      setNoMoreCoins(true);
    }
    setIsLoading(false);
  };

  /////////////////////FOR ROUTING////////////////////

  const showPagesNumHandler = (page) => {
    navigate(`/all-coins?page=${page}`);
  };

  //=================== FETCH NEXT PAGE

  const fetchSecondPageHandler = () => {
    setIsLoading(true);
    setFetchNextPage((nextPage) => nextPage + 1);
    const nextPage = fetchNextPage + 1;
    navigate(`/all-coins?page=${nextPage}`);

    setSecondPageFetched(true);
    setIsLoading(false);
  };

  //================= PREVIOUS PAGE

  const previousPageHandler = () => {
    setIsLoading(true);
    setFetchNextPage((nextPage) => nextPage - 1);
    const prevPage = fetchNextPage - 1;
    navigate(`/all-coins?page=${prevPage}`);
    setIsLoading(false);
  };

  //==================== SORT BY MARKET CAP

  const sortByMcHandler = useCallback(() => {
    navigate(`${location.pathname}?McSort=${mcSorting ? "desc" : "asc"}`);
  }, [location.pathname, mcSorting, navigate]);

  //========================== GOT TIME FOR price_change_percentage in API

  const gotTimeHandler = (time) => {
    setpriceChangeTime(time);
  };

  return (
    <Fragment>
      <div className={classes.main}>
        <Banner />

        <div className={classes["coin-search"]}>
          <h1 className={classes["coin-text"]}>Search a Currency</h1>
          <form>
            <input
              type="search"
              placeholder="Search for Crypto Currencies.."
              className={classes["coin-input"]}
              onChange={handleChange}
              value={search ? search : ""}
              disabled={
                localStorage.getItem("CryptoPage") === "2" ? false : true
              }
            />
          </form>
        </div>
        <div>
          <Button onClick={sortByMcHandler}>
            Sort MC by {mcSorting ? "Ascending ⇧" : "Descending ⇩"}
          </Button>

          <PriceChangeByTime changedTime={gotTimeHandler} />
        </div>

        {!isLoading && coins.length > 0 && (
          <div className={classes["all-coins"]}>
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
        {isLoading && (
          <img src={loader} alt="loading..." className={classes.loader} />
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

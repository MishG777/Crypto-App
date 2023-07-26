//used in Coins.js
import { useEffect, useState } from "react";
import axios from "axios";
import classes from "./Banner.module.css";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";
import ConvertBtc from "./ConvertToBtc";
import trendingIcon from "../img/trending.png";

const MyBanner = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [error, setError] = useState("");

  const { currency } = CryptoState();

  const isloggedin = localStorage.getItem("CryptoPage") === "2";

  let URL = "https://api.coingecko.com/api/v3/search/trending";

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        const CoinsData = res.data?.coins;

        setTrendingCoins(CoinsData);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [URL]);

  const items = trendingCoins.map((coin) => {
    return (
      <Link
        onClick={() => localStorage.setItem("CoinName", coin.item.name)}
        to={
          isloggedin
            ? `${coin.item.id}?currency=${currency}`
            : "/auth-registration-page"
        }
        className={classes.linkk}
      >
        <div className={classes.carouselItem}>
          <img src={coin.item.small} alt={coin.item.name} />
          <div className={classes.trendingsText}>
            <p>{coin.item.market_cap_rank}</p>
            <p>{coin.item.symbol}</p>
            <ConvertBtc priceId={coin.item.id} />
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className={classes.mainBanner}>
      <div>
        <h5>
          Step into the realm of cryptocurrencies, where virtual wealth knows no
          borders!
        </h5>
      </div>
      <h4>
        {" "}
        <img src={trendingIcon} alt="trending icon" />
        Trendings
      </h4>
      <div className={classes.carousel}>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={2000}
          autoPlay
          items={items}
        />
      </div>

      {error}
    </div>
  );
};

export default MyBanner;

//used in Coins.js
import { memo, useEffect, useState } from "react";
import axios from "axios";
import classes from "./Banner.module.css";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";
import ConvertBtc from "./ConvertBtc";
import trendingIcon from "../img/trending.png";

const Banner = () => {
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

  console.log(trendingCoins);

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

  //const responsive = {
  //  0: { items: 3 },
  //  600: { items: 6 },
  //  1024: { items: 9 },
  //};

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
          //infinite
          autoPlayInterval={1000}
          animationDuration={3000}
          autoPlay
          //disableDotsControls
          //responsive={responsive}
          items={items}
        />
      </div>

      {error}
    </div>
  );
};

export default memo(Banner);

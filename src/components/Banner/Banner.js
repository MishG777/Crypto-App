import { memo, useEffect, useState } from "react";
import axios from "axios";
import classes from "./Banner.module.css";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";

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
  //console.log(trendingCoins.map((coin) => console.log(coin.item.name)));

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
          <span>{coin.item.name}</span>
        </div>
      </Link>
    );
  });

  //const responsive = {
  //  0: {
  //    items: 4,
  //  },
  //  512: {
  //    items: 9,
  //  },
  //};

  return (
    <div className={classes.mainBanner}>
      <p>
        Step into the realm of cryptocurrencies, where virtual wealth knows no
        borders!
      </p>

      <div className={classes.carousel}>
        <AliceCarousel
          className={classes.mainCarousel}
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          autoPlay
          //responsive={responsive}
          items={items}
        />
      </div>

      {error}
    </div>
  );
};

export default memo(Banner);

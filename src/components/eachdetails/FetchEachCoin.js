import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./FetchEachCoin.module.css";
import btc from "../img/btc.png";
import twitter from "../img/twitter.png";
import { Select, MenuItem } from "@mui/material";
import { FaInfinity } from "react-icons/fa";

//used in CoinDetails.js
const FetchEachCoin = ({ coin, USDorEUR, isUsd }) => {
  const [eachCoin, setEachCoin] = useState({});
  const [ishigh, setIshigh] = useState(false);

  const [priceTime, setPriceTime] = useState("24h");

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const EachCoinURL = `https://api.coingecko.com/api/v3/coins/${coin}`;

  useEffect(() => {
    const getEachCoin = async () => {
      const { data } = await axios.get(EachCoinURL);

      console.log(data);
      const mrkData = data.market_data;
      const transformedCoins = {
        id: data.id,
        name: data.name,
        rank: data.market_cap_rank,
        symbol: data.symbol,
        desc: data.description.en,
        img: data.image.large,
        last_updated: data.last_updated,
        moreData: {
          /*DONE*/ circ_supply: mrkData?.circulating_supply,
          /*DONE*/ max_suply: mrkData?.max_supply,
          /*DONE*/ total_volumeBtc: mrkData?.total_volume.btc,

          /*DONE*/ high_24h: isUsd
            ? mrkData?.high_24h.usd || 0
            : mrkData?.high_24h.eur || 0,
          /*DONE*/ low_24h: isUsd
            ? mrkData?.low_24h.usd || 0
            : mrkData?.low_24h.eur || 0,

          //Market Cap | changes
          /*DONE*/ mc: isUsd
            ? mrkData?.market_cap.usd
            : mrkData?.market_cap.eur,
          /*DONE*/ mcChange24h: mrkData?.market_cap_change_percentage_24h,
          /*DONE*/ mcChangeInBtc:
            mrkData?.market_cap_change_percentage_24h_in_currency.btc,

          //price | changes
          prices: {
            /*DONE*/ prcChange24h: mrkData?.price_change_percentage_24h || 0,
            prcChange7D: mrkData?.price_change_percentage_7d || 0,
            prcChange30D: mrkData?.price_change_percentage_30d || 0,
            prcChange200d: mrkData?.price_change_percentage_200d || 0,
            prcChange1yr: mrkData?.price_change_percentage_1y || 0,
          },
        },

        //blocksPerMin: data.block_time_in_minutes,
        //genesisDate: data.genesis_date,
        //hashing: data.hashing_algorithm,
        twitter_followers:
          data?.community_data.twitter_followers.toLocaleString() || 0,
        price: isUsd
          ? mrkData?.current_price.usd || 0
          : mrkData?.current_price.eur || 0,
      };

      setEachCoin(transformedCoins);
    };

    getEachCoin();
  }, [EachCoinURL, isUsd]);

  ////////////////////////////

  const getDescription = () => {
    if (eachCoin.desc) {
      return eachCoin.desc
        .split(". ")
        .filter((desc) => !desc.includes("<a"))
        .join(". ");
    }
    return "No Description for this coin";
  };

  const description = getDescription();
  const coinData = eachCoin.moreData || {};

  let time = 0;
  if (priceTime === "24h") {
    time = coinData.prices?.prcChange24h;
  } else if (priceTime === "7D") {
    time = coinData.prices?.prcChange7D;
  } else if (priceTime === "30D") {
    time = coinData.prices?.prcChange30D;
  } else if (priceTime === "200D") {
    time = coinData.prices?.prcChange200d;
  } else if (priceTime === "1Y") {
    time = coinData.prices?.prcChange1yr;
  }

  const getColorClass = (time) => {
    const prices = eachCoin.moreData?.prices;
    if (prices) {
      if (time > 0) {
        return classes.green;
      } else if (time < 0) {
        return classes.red;
      }
    }
    return classes.grey;
  };
  const color = getColorClass(time);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function translateNumber(number) {
    if (typeof number !== "number" || isNaN(number)) {
      return <FaInfinity style={{ fontSize: 15 }} />;
    }

    if (screenWidth < 1420) {
      if (number >= 1000000000) {
        return (number / 1000000000).toFixed(2) + " B";
      } else if (number >= 1000000) {
        return (number / 1000000).toFixed(2) + " M";
      } else if (number >= 1000) {
        return (number / 1000).toFixed(2) + " K";
      }
    }

    return number.toLocaleString();
  }

  const timeChanger = (event) => {
    setPriceTime(event.target.value);
  };

  //console.log(typeof coinData.prices?.prcChange24h);

  return (
    <div className={classes.mainDiv}>
      {/*left*/}
      <div className={classes.coinDetails}>
        <div className={classes.imageContainer}>
          <img src={eachCoin.img} alt="Coin" />
        </div>
        <p className={classes.description}>{description}</p>
        <div className={classes.fewDetails}>
          <h2>{eachCoin.rank}</h2>
          <h3>{eachCoin.symbol?.toUpperCase()}</h3>
          <h4>{eachCoin.price?.toLocaleString() + " " + USDorEUR}</h4>
        </div>

        <div className={classes.leftLowerDiv}>
          <h4>followers</h4>
          <p>
            {eachCoin.twitter_followers}
            <img src={twitter} alt="twitter" />
          </p>
        </div>
      </div>

      {/*right*/}
      {/*first inner div*/}
      <div className={classes.moreDetails}>
        <div className={classes.innerTopDiv}>
          <div className={classes.centeredText}>
            <h4>Circulating supply</h4>
            <p>
              {translateNumber(coinData.circ_supply)}{" "}
              {/*{coinData.circ_supply?.toLocaleString()}*/}
              <img src={eachCoin.img} alt="icon" />
            </p>
          </div>
          <div className={classes.centeredText}>
            <h4>Max supply</h4>
            <p>
              {translateNumber(coinData.max_suply) || (
                <span className={classes.infinite}>∞</span>
              )}{" "}
              <img src={eachCoin.img} alt="icon" />
            </p>
          </div>
          <div className={classes.centeredText}>
            <h4>Total Volume(btc)</h4>
            <p>
              {translateNumber(coinData.total_volumeBtc)}
              <img src={btc} alt="icon" />
            </p>
          </div>
        </div>

        {/*second div*/}
        <div className={classes.highLow}>
          <h4 onClick={() => setIshigh((prev) => !prev)}>
            {ishigh ? "24h high ⇧" : "24h low ⇩"}
          </h4>

          <p>
            {ishigh ? coinData.high_24h : coinData.low_24h}
            {" " + USDorEUR}
          </p>
        </div>

        {/*third div*/}

        <div className={classes.innerThirdDiv}>
          <div className={classes.centeredText}>
            <h4>Market Cap</h4>
            <p>
              {translateNumber(coinData.mc)}{" "}
              <img src={eachCoin.img} alt="icon" />
            </p>
          </div>
          <div className={classes.centeredText}>
            <h4>MC Change 24h</h4>
            <p>
              {translateNumber(coinData.mcChange24h) || (
                <span className={classes.infinite}>∞</span>
              )}{" "}
              %
            </p>
          </div>
          <div className={classes.centeredText}>
            <h4>MC change 24h(btc)</h4>
            <p>
              {coinData.mcChangeInBtc?.toLocaleString()}
              <img src={btc} alt="icon" />
            </p>
          </div>
        </div>

        <div className={classes.priceChange}>
          <h4>
            Price change{" "}
            <Select
              sx={{
                backgroundColor: "transparent",
                border: "none",
                borderRadius: 1,
                height: "20px",
                padding: 0,
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
                outline: "none",

                "@media (max-width: 600px)": {
                  fontSize: "10px",
                  padding: "1px",
                },

                "& .MuiSelect-icon": {
                  color: "white",
                },
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    transform: "translateX(100%)",
                  },
                },
              }}
              value={priceTime}
              onChange={timeChanger}
            >
              <MenuItem value="24h" sx={{ fontSize: "0.7rem" }}>
                24h
              </MenuItem>
              <MenuItem value="7D" sx={{ fontSize: "0.7rem" }}>
                7D
              </MenuItem>
              <MenuItem value="30D" sx={{ fontSize: "0.7rem" }}>
                30D
              </MenuItem>
              <MenuItem value="200D" sx={{ fontSize: "0.7rem" }}>
                200D
              </MenuItem>
              <MenuItem value="1Y" sx={{ fontSize: "0.7rem" }}>
                1Y
              </MenuItem>
            </Select>
          </h4>
          <p className={`${color} `}>
            {time}
            <span>%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FetchEachCoin;

import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./FetchEachCoin.module.css";
import btc from "../img/btc.png";
//used in CoinDetails.js
const FetchEachCoin = ({ coin, USDorEUR, isUsd }) => {
  const [eachCoin, setEachCoin] = useState({});
  const [ishigh, setIshigh] = useState(false);

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
        moreData: {
          circ_supply: mrkData?.circulating_supply,
          max_suply: mrkData?.max_supply,
          total_volumeBtc: mrkData?.total_volume.btc,
          //Market Cap | changes
          mc: isUsd ? mrkData?.market_cap.usd : mrkData?.market_cap.eur,
          mcChange24h: mrkData?.market_cap_change_percentage_24h,
          mcChangeInBtc: mrkData?.market_cap_change_percentage_24h_in_currency,
          high_24h: isUsd
            ? mrkData?.high_24h.usd || 0
            : mrkData?.high_24h.eur || 0,
          low_24h: isUsd
            ? mrkData?.low_24h.usd || 0
            : mrkData?.low_24h.eur || 0,

          //price | changes
          prices: {
            prcChange24h: mrkData?.price_change_percentage_24h || 0,
            prcChange7D: mrkData?.price_change_percentage_7d || 0,
            prcChange30D: mrkData?.price_change_percentage_30d || 0,
            prcChange200d: mrkData?.price_change_percentage_200d || 0,
            prcChange1yr: mrkData?.price_change_percentage_1y || 0,
          },
        },
        blocksPerMin: data.block_time_in_minutes,
        genesisDate: data.genesis_date,
        price: isUsd
          ? mrkData?.current_price.usd || 0
          : mrkData?.current_price.eur || 0,
        hashing: data.hashing_algorithm,
      };

      setEachCoin(transformedCoins);
    };

    getEachCoin();
  }, [EachCoinURL, isUsd]);

  //console.log(Object.keys(eachCoin.moreData?.prices));
  const getColorClass = () => {
    if (eachCoin.moreData && eachCoin.moreData.prices) {
      //const value = eachCoin.moreData.prices.prcChange24h; //but thats for just one, will do for every
      //console.log(value);

      //if (value <= 0) {
      //  return classes.red;
      //} else if (value > 0) {
      //  return classes.green;
      //}

      //2

      for (const key in eachCoin.moreData?.prices) {
        if (eachCoin.moreData?.prices.hasOwnProperty(key)) {
          const value = eachCoin.moreData?.prices[key];
          //console.log(value);
          if (value > 0) {
            return classes.green;
          } else if (value < 0) {
            return classes.red;
          } else {
            return classes.grey;
          }
        }
      }
    }
    return classes.grey;
  };

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

  const color = getColorClass();
  const description = getDescription();
  const coinData = eachCoin.moreData || {};

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
      </div>

      {/*right*/}
      <div className={classes.moreDetails}>
        <div className={classes.innerTopDiv}>
          <div className={classes.centeredText}>
            <text>Circulating supply</text>
            <p>
              {coinData.circ_supply?.toLocaleString()}{" "}
              <img src={eachCoin.img} alt="icon" />
            </p>
          </div>
          <div className={classes.centeredText}>
            <text>Max supply</text>
            <p>
              {coinData.max_suply?.toLocaleString() || (
                <span className={classes.infinite}>∞</span>
              )}{" "}
              <img src={eachCoin.img} alt="icon" />
            </p>
          </div>
          <div className={classes.centeredText}>
            <text>Total Volume(btc)</text>
            <p>
              {coinData.total_volumeBtc?.toLocaleString()}
              <img src={btc} alt="icon" />
            </p>
          </div>
        </div>

        {/*middle div*/}
        <div className={classes.highLow}>
          <text onClick={() => setIshigh((prev) => !prev)}>
            {ishigh ? "24h high ⇧" : "24h low ⇩"}
          </text>

          <p>
            {ishigh ? coinData.high_24h : coinData.low_24h}
            {/*{" " + USDorEUR}*/}
          </p>
        </div>

        <p className={`${color}`}>
          {coinData.prices?.prcChange24h}
          <span>%</span>
        </p>
      </div>
    </div>
  );
};

export default FetchEachCoin;

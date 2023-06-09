import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./FetchEachCoin.module.css";

//used in CoinDetails.js
const FetchEachCoin = ({ coin, USDorEUR, isUsd }) => {
  const [eachCoin, setEachCoin] = useState({});

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

          //price | changes
          prices: {
            high_24h: isUsd ? mrkData?.high_24h.usd : mrkData?.high_24h.eur,
            low_24h: isUsd ? mrkData?.low_24h.usd : mrkData?.low_24h.eur,
            prcChange24h: mrkData?.price_change_percentage_24h,
            prcChange7D: mrkData?.price_change_percentage_7d,
            prcChange30D: mrkData?.price_change_percentage_30d,
            prcChange200d: mrkData?.price_change_percentage_200d,
            prcChange1yr: mrkData?.price_change_percentage_1y,
          },
        },
        blocksPerMin: data.block_time_in_minutes,
        //homepage: data.homepage[0],
        genesisDate: data.genesis_date,
        price: isUsd ? mrkData?.current_price.usd : mrkData?.current_price.eur,
        hashing: data.hashing_algorithm,
      };

      setEachCoin(transformedCoins);
    };

    getEachCoin();
  }, [EachCoinURL, isUsd]);

  const getColorClass = () => {
    if (eachCoin.moreData && eachCoin.moreData.prices) {
      for (const key in eachCoin.moreData.prices ?? {}) {
        if (eachCoin.moreData.prices.hasOwnProperty(key)) {
          const value = eachCoin.moreData.prices[key];
          if (value >= 0) {
            return classes.green;
          } else if (value < 0) {
            return classes.red;
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
          <h4>{eachCoin.price?.toLocaleString() + USDorEUR}</h4>
        </div>
      </div>

      {/*right*/}
      <div className={classes.moreDetails}>
        <div className={classes.innerTopDiv}>
          <div className={classes.centeredText}>
            <p>Circulating supply</p>
            <p>
              {coinData.circ_supply?.toLocaleString()}{" "}
              {eachCoin.symbol?.toLowerCase()}
            </p>
          </div>
          <div className={classes.centeredText}>
            <p>Max supply</p>
            <p>
              {coinData.max_suply?.toLocaleString()}{" "}
              {eachCoin.symbol?.toLowerCase()}
            </p>
          </div>
          <div className={classes.centeredText}>
            <p>Total Volume(btc)</p>
            <p>{coinData.total_volumeBtc?.toLocaleString()}</p>
          </div>
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

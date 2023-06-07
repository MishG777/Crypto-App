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
          circ_supply: mrkData.circulating_supply,
          total_suply: mrkData.max_supply,
          high_24h: isUsd ? mrkData.high_24h.usd : mrkData.high_24h.eur,
          low_24h: isUsd ? mrkData.low_24h.usd : mrkData.low_24h.eur,
          total_volumeBtc: mrkData.total_volume.btc,
          //Market Cap | changes
          mc: isUsd ? mrkData.market_cap.usd : mrkData.market_cap.eur,
          mcChange24h: mrkData.market_cap_change_percentage_24h,
          mcChangeInBtc: mrkData.market_cap_change_percentage_24h_in_currency,

          //price | changes
          prices: {
            prcChange24h: mrkData.price_change_percentage_24h,
            prcChange7D: mrkData.price_change_percentage_7d,
            prcChange30D: mrkData.price_change_percentage_30d,
            prcChange200d: mrkData.price_change_percentage_200d,
            prcChange1yr: mrkData.price_change_percentage_1y,
          },
        },
        blocksPerMin: data.block_time_in_minutes,
        //homepage: data.homepage[0],
        genesisDate: data.genesis_date,
        price: isUsd ? mrkData.current_price.usd : mrkData.current_price.eur,
        hashing: data.hashing_algorithm,
      };

      setEachCoin(transformedCoins);
    };

    getEachCoin();
  }, [EachCoinURL, isUsd]);

  //testing
  //console.log(typeof +eachCoin.moreData.prices.prcChange24h);

  let color = "";
  //let grey = classes.grey;
  if (eachCoin.moreData && eachCoin.moreData.prices) {
    for (const key in eachCoin.moreData.prices ?? {}) {
      if (eachCoin.moreData.prices.hasOwnProperty(key)) {
        const value = eachCoin.moreData.prices[key];
        if (value >= 0) {
          color = "";
          color += classes.green + " ";
        } else if (value < 0) {
          color = "";
          color += classes.red + " ";
        } else {
          console.log(`${value} is equal to 0`);
        }
      }
    }
  }
  color = color.trim(); ///////////////////do this

  ////////////////////////////

  let description = "";
  if (eachCoin.desc) {
    description += eachCoin.desc
      .split(". ")
      .filter((desc) => !desc.includes("<a"))
      .join(". ");
  } else {
    return "No Description for this coin";
  }

  return (
    <div className={classes.mainDiv}>
      <div className={classes.coinDetails}>
        <div className={classes.imageContainer}>
          <img src={eachCoin.img} alt="Coin" />
        </div>
        <p className={classes.description}>{description}</p>
        <div className={classes.fewDetails}>
          <h2>{eachCoin.rank}</h2>
          <h3>{eachCoin.symbol?.toUpperCase()}</h3>
          <h4>{eachCoin.price.toLocaleString() + USDorEUR}</h4>
        </div>
      </div>
      {/*{Object.values(eachCoin.mrkData)}*/}
      <div className={classes.moreDetails}>
        <h2 className={`${color}`}>{eachCoin.moreData.prices.prcChange24h}</h2>
      </div>
    </div>
  );
};

export default FetchEachCoin;

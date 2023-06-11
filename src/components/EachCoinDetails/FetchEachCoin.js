import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./FetchEachCoin.module.css";
import btc from "../img/btc.png";
import twitter from "../img/twitter.png";
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
          mc: isUsd ? mrkData?.market_cap.usd : mrkData?.market_cap.eur,
          mcChange24h: mrkData?.market_cap_change_percentage_24h,
          mcChangeInBtc:
            mrkData?.market_cap_change_percentage_24h_in_currency.btc,

          //price | changes
          prices: {
            prcChange24h: mrkData?.price_change_percentage_24h || 0,
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

  //console.log(eachCoin.twitter_followers);

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
              {coinData.circ_supply?.toLocaleString()}{" "}
              <img src={eachCoin.img} alt="icon" />
            </p>
          </div>
          <div className={classes.centeredText}>
            <h4>Max supply</h4>
            <p>
              {coinData.max_suply?.toLocaleString() || (
                <span className={classes.infinite}>∞</span>
              )}{" "}
              <img src={eachCoin.img} alt="icon" />
            </p>
          </div>
          <div className={classes.centeredText}>
            <h4>Total Volume(btc)</h4>
            <p>
              {coinData.total_volumeBtc?.toLocaleString()}
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
              {coinData.mc?.toLocaleString()}{" "}
              <img src={eachCoin.img} alt="icon" />
            </p>
          </div>
          <div className={classes.centeredText}>
            <h4>MC Change 24h</h4>
            <p>
              {coinData.mcChange24h?.toLocaleString() || (
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
          <h4>Price change 24h</h4>
          <p className={`${color}`}>
            {coinData.prices?.prcChange24h}
            <span>%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FetchEachCoin;

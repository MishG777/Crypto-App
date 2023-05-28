import React from "react";
import axios from "axios";
import { Fragment } from "react";

//used in CoinDetails.js
const FetchEachCoin = ({ coin }) => {
  const EachCoinURL = `https://api.coingecko.com/api/v3/coins/${coin}`;
  axios.get(EachCoinURL).then((res) => {
    const eachCoinDetails = res.data;
    //console.log(eachCoinDetails);
  });

  return <div>Fetching each coin</div>;
};

export default FetchEachCoin;

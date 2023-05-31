import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./FetchEachCoin.module.css";

//used in CoinDetails.js
const FetchEachCoin = ({ coin }) => {
  const [eachCoin, setEachCoin] = useState([]);

  const EachCoinURL = `https://api.coingecko.com/api/v3/coins/${coin}`;

  useEffect(() => {
    const getEachCoin = async () => {
      const { data } = await axios.get(EachCoinURL);

      const transformedCoins = {
        id: data.id,
        name: data.name,
        rank: data.rank,
        symbol: data.symbol,
        desc: data.description.en,
        img: data.image.large,
        mrkData: [data.market_data], //will use map here
      };

      setEachCoin(transformedCoins);
    };

    getEachCoin();
  }, [EachCoinURL]);
  //console.log(eachCoin);
  console.log(eachCoin.desc);

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
      <h3>{eachCoin.symbol}</h3>
      {/*here i need a component and then pass a prop like {...eachCoin}*/}
      <p>{description}</p>
    </div>
  );
};

export default FetchEachCoin;

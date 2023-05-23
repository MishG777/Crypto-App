import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import classes from "./CoinDetails.module.css";
//import { data } from "./PagesData";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CoinDetails = () => {
  const [graphData, setGraphData] = useState([]);

  const location = useLocation();
  //const navigate = useNavigate();

  const currencyParams = new URLSearchParams(location.search);
  const currency = currencyParams.get("currency");
  const isUsd = currencyParams.get("currency") === "usd";

  let error = "";
  console.log(error);

  const params = useParams();
  const coin = params.details.toLowerCase().replace(/%20|\s/g, "-");

  let chartURL = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=4`;

  useEffect(() => {
    axios
      .get(chartURL)
      .then((res) => {
        const chartCoins = res.data;

        const graphDt = chartCoins.prices.map((price) => {
          const [timestamp, prc] = price;

          return {
            Date: new Date(timestamp).toLocaleString(),
            Price: prc,
          };
        });
        setGraphData(graphDt);
      })
      .catch((error) => {
        error += error.message;
      });
  }, [chartURL]);

  return (
    <div>
      <AreaChart
        width={800}
        height={500}
        fontSize={10}
        data={graphData}
        margin={{
          top: 30,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        {/*<CartesianGrid stroke="2 2" />*/}
        <Legend />
        <XAxis
          dataKey="Date"
          //tickFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
        />
        <YAxis
          dataKey="Price"
          tickFormatter={(price) => {
            if (price >= 1000) {
              return price / 1000 + "K";
            }
            return price;
          }}
        />

        <Tooltip
          formatter={(value) => value.toFixed(2) + `${isUsd ? "$" : "€"}`}
          contentStyle={{
            borderRadius: "20px",
          }}
          labelClassName={classes.toltip}
        />

        <Area type="Cross" dataKey="Price" stroke="#8884d2" fill="#mls5" />
      </AreaChart>
    </div>
  );
};

export default CoinDetails;

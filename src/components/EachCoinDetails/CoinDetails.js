import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//import classes from "./CoinDetails.module.css";
//import { data } from "./PagesData";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  //ResponsiveContainer,
} from "recharts";

const CoinDetails = ({ currency }) => {
  const [graphData, setGraphData] = useState([]);

  let error = "";
  console.log(error);

  const params = useParams();
  const coin = params.details.toLowerCase().replace(/%20|\s/g, "-");

  let chartURL = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=121`;

  useEffect(() => {
    axios
      .get(chartURL)
      .then((res) => {
        const chartCoins = res.data;

        const graphDt = chartCoins.prices.map((price) => {
          const [timestamp, prc] = price;

          return {
            Date: timestamp,
            CoinsPrice: prc,
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
        <CartesianGrid strokeDasharray="2 2 2" />
        <XAxis
          dataKey="Date"
          tickFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
        />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="CoinsPrice"
          stroke="#8884d2"
          fill="#2984d8"
        />
      </AreaChart>
    </div>
  );
};

export default CoinDetails;

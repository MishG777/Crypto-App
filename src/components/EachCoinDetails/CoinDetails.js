import React, { Fragment, useEffect, useState } from "react";
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
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

const CoinDetails = () => {
  const [graphData, setGraphData] = useState([]);
  //const [days, setDays] = useState(1);

  const location = useLocation();

  const currencyParams = new URLSearchParams(location.search);
  const currency = currencyParams.get("currency");
  const isUsd = currencyParams.get("currency") === "usd";

  let error = "";

  const params = useParams();
  const coin = params.details.toLowerCase().replace(/%20|\s/g, "-");

  //const daysHandler = (e) => {
  //  e.preventDefault();
  //  setDays(e.target.value);
  //};

  let chartURL = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=50`;

  useEffect(() => {
    axios
      .get(chartURL)
      .then((res) => {
        const chartCoins = res.data;

        const graphDt = chartCoins.prices.map((price) => {
          const [timestamp, prc] = price;

          return {
            Date: new Date(timestamp).toLocaleDateString(),
            Price: prc,
          };
        });
        setGraphData(graphDt);
      })
      .catch((error) => {
        error += error.message;
      });
  }, [chartURL]);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const USDorEUR = `${isUsd ? "$" : "€"}`;

  //function CustomTooltip({ active, payload, label }) {
  //  if (active) {
  //    return (
  //      <div className={classes.tooltip}>
  //        <h4>{label}</h4>
  //        <h4>{payload[0].value.toFixed(3) + USDorEUR}</h4>
  //      </div>
  //    );
  //  }
  //  return null;
  //}
  function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const date = new Date(label);
      const formattedDate = format(date, "eee | MMM d | yyyy");
      return (
        <div className={classes.tooltip}>
          <h4>{formattedDate}</h4>
          <h4>{data.Price.toFixed(3) + USDorEUR}</h4>
        </div>
      );
    }
    return null;
  }
  return (
    <Fragment>
      {error}
      {/*<div>
        <button onClick={daysHandler} value={2}>
          2
        </button>
        <button onClick={daysHandler} value={10}>
          10
        </button>
      </div>*/}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          fontSize={10}
          data={graphData}
          margin={{
            top: 50,
            right: 40,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid opacity={0.25} strokeDasharray="1" vertical={false} />

          {/*<XAxis dataKey="Date" axisLine={false} interval={90} />*/}
          <XAxis
            interval={180}
            dataKey="Date"
            axisLine={false}
            tickLine={false}
            tickFormatter={(timeStr) => {
              const date = new Date(timeStr);
              const month = monthNames[date.getMonth()];
              const day = date.getDate();
              return `${month}, ${day}`;
            }}
          />
          <YAxis
            tickCount={7}
            dataKey="Price"
            name="Price"
            axisLine={false}
            tickLine={false}
            tickFormatter={(price) => {
              if (price >= 1000) {
                return USDorEUR + price / 1000 + "K";
              }
              return USDorEUR + price.toFixed(2);
            }}
          />

          <Tooltip content={<CustomTooltip />} />

          <defs>
            <linearGradient id="GradColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d2" stopOpacity={0.5} />
              <stop offset="75%" stopColor="#8884d2" stopOpacity={0.08} />
            </linearGradient>
          </defs>

          <Area
            dataKey="Price"
            stroke="#a6a2db"
            strokeWidth={1.5}
            fill="url(#GradColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Fragment>
  );
};

export default CoinDetails;

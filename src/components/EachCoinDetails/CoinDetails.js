import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import classes from "./CoinDetails.module.css";
import FetchEachCoin from "./FetchEachCoin";
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
  const [containerWidth, setContainerWidth] = useState("100%");

  //const [days, setDays] = useState(1);

  const location = useLocation();

  const currencyParams = new URLSearchParams(location.search);
  const currency = currencyParams.get("currency");
  const isUsd = currencyParams.get("currency") === "usd";

  let error = "";
  const coinName = localStorage.getItem("CoinName");

  const params = useParams();
  const coin = params.details;
  //.toLowerCase().replace(/%20|\s/g, "-");

  //const daysHandler = (e) => {
  //  e.preventDefault();
  //  setDays(e.target.value);
  //};

  const chartURL = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=50`;

  //const EachCoinURL = `https://api.coingecko.com/api/v3/coins/${coin}`

  useEffect(() => {
    axios
      .get(chartURL)
      .then((res) => {
        const chartCoins = res.data;
        //console.log(chartCoins);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 650) {
        setContainerWidth("93%");
      } else {
        setContainerWidth("80%");
      }
    };

    // Add event listener to listen for screen size changes
    window.addEventListener("resize", handleResize);

    // Call the resize handler initially
    handleResize();

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div className={classes.mainChartDiv}>
        <h2 className={classes.coinTitle}>{coinName}</h2>
        <ResponsiveContainer width={containerWidth} height={350}>
          <AreaChart
            fontSize={10}
            data={graphData}
            margin={{
              top: 25,
              right: 0,
              left: 40,
              bottom: 0,
            }}
          >
            <Area
              dataKey="Price"
              stroke="#a6a2db"
              strokeWidth={1.5}
              fill="url(#GradColor)"
            />

            <CartesianGrid
              opacity={0.25}
              strokeDasharray="1"
              vertical={false}
            />

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
              tick={{
                style: {
                  fontWeight: "bold",
                  fontSize: "10px",
                },
              }}
            />
            <YAxis
              tickCount={5}
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
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <FetchEachCoin coin={coin} />
    </Fragment>
  );
};

export default CoinDetails;

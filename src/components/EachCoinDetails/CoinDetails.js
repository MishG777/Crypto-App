import React, { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
import { CryptoState } from "../context/CryptoContext";

const CoinDetails = () => {
  const [graphData, setGraphData] = useState([]);
  const [containerWidth, setContainerWidth] = useState("100%");

  const [days, setDays] = useState(50);
  const [activeButton, setActiveButton] = useState(null);

  const daysRef = useRef(null);
  //const location = useLocation();

  const { currency } = CryptoState();

  //const currencyParams = new URLSearchParams(location.search);
  //const currency = currencyParams.get("currency");
  const isUsd = currency === "usd";

  let error = "";
  const coinName = localStorage.getItem("CoinName");

  const params = useParams();
  const coin = params.details;
  //.toLowerCase().replace(/%20|\s/g, "-");

  const daysHandler = (e) => {
    e.preventDefault();
    const value = parseInt(e.target.value);
    setActiveButton(value);
    setDays(value);
  };

  const showDaysHandler = (e) => {
    e.preventDefault();
    setDays(daysRef.current.value);
    setActiveButton(daysRef.current.value);
    daysRef.current.value = "";
  };

  console.log(days);

  const chartURL = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`;

  //const EachCoinURL = `https://api.coingecko.com/api/v3/coins/${coin}`

  useEffect(() => {
    axios
      .get(chartURL)
      .then((res) => {
        const chartCoins = res.data;
        console.log(chartCoins);

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

  const USDorEUR = `${isUsd ? "$" : "€"}`;

  function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const date = new Date(label);
      const formattedDate = format(date, "eee | MMM d | Y");
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
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Fragment>
      {error}

      <h2 className={classes.coinTitle}>{coinName}</h2>

      <div className={classes.mainChartDiv}>
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
                const formattedDate = format(date, "d MMM / yy");
                //const month = monthNames[date.getMonth()];
                //const day = date.getDate();
                //return `${month}, ${day}`;
                return `${formattedDate}`;
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

        <div className={classes.chartTime}>
          <form className={classes.timeButtons}>
            <button
              className={`${classes.chartButton} ${
                activeButton === 1 ? classes.active : ""
              }`}
              onClick={daysHandler}
              value={1}
            >
              24 Hours
            </button>
            <button
              className={`${classes.chartButton} ${
                activeButton === 30 ? classes.active : ""
              }`}
              onClick={daysHandler}
              value={30}
            >
              30 Days
            </button>
            <button
              className={`${classes.chartButton} ${
                activeButton === 90 ? classes.active : ""
              }`}
              onClick={daysHandler}
              value={90}
            >
              3 Month
            </button>
          </form>

          <form onSubmit={showDaysHandler} className={classes.inputDays}>
            <input
              type="number"
              placeholder="enter num of days"
              //onChange={changeDaysHandler}
              ref={daysRef}
            />
            <button type="submit" className={classes.show}>
              show
            </button>
          </form>
        </div>
      </div>

      <FetchEachCoin coin={coin} />
    </Fragment>
  );
};

export default CoinDetails;

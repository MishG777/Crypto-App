import React, { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import classes from "./CoinDetails.module.css";
//import FetchEachCoin from "./FetchEachCoin";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { format } from "date-fns";
import { CryptoState } from "../context/CryptoContext";
import FetchEachCoin from "./FetchEachCoin";
import Button from "../UI/Button";

const CoinDetails = () => {
  const [graphData, setGraphData] = useState([]);
  const [containerWidth, setContainerWidth] = useState("85%");
  const [error, setError] = useState(false);
  const [days, setDays] = useState(50);
  const [activeButton, setActiveButton] = useState(null);
  const [showHl, setShowHl] = useState(false);

  const daysRef = useRef(null);
  const XintervalRef = useRef(false);

  const { currency, symb } = CryptoState();

  //const isUsd = currency === "usd";
  //const symb = `${isUsd ? "$" : "€"}`;

  const coinName = localStorage.getItem("CoinName");

  const params = useParams();
  const coin = params.details;

  const daysHandler = (e) => {
    e.preventDefault();
    const value = parseInt(e.target.value);
    setActiveButton(value);
    setDays(value);
  };

  const showDaysHandler = (e) => {
    e.preventDefault();
    console.log(typeof +daysRef.current.value);
    console.log(+daysRef.current.value);
    if (+daysRef.current.value <= 0) {
      setError(true);
      return;
    }

    setError(false);
    setDays(daysRef.current.value);
    setActiveButton(daysRef.current.value);
    daysRef.current.value = "";
  };

  ///////////API

  const chartURL = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`;

  useEffect(() => {
    axios
      .get(chartURL)
      .then((res) => {
        const chartCoins = res.data;
        //console.log(chartCoins);

        const graphDt = chartCoins.prices.map((price) => {
          const [timestamp, prc] = price;

          return {
            Date: timestamp,
            Price: prc,
          };
        });
        setGraphData(graphDt);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chartURL]);

  /////////////////////tooltip element

  function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const date = new Date(label);
      const formattedDate = format(date, "eee | MMM d | Y");
      return (
        <div className={classes.tooltip}>
          <h4>{formattedDate}</h4>
          <h4>{data.Price.toFixed(3) + symb}</h4>
        </div>
      );
    }
    return null;
  }

  ////////////////////////////chart sizing

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 950) {
        setContainerWidth("93%");
        XintervalRef.current = true;
      } else {
        setContainerWidth("85.5%");
        XintervalRef.current = false;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  ///////////////////show HL///////////////////////

  const showHlHandler = (e) => {
    e.preventDefault();
    setShowHl((prev) => !prev);
  };

  //////////////////////////////////////////

  //Date for the highest price /////////////////////////

  const highestPriceEntry = graphData.find(
    (entry) =>
      entry.Price === Math.max(...graphData.map((entry) => entry.Price))
  );
  const highestPriceDate = highestPriceEntry ? highestPriceEntry.Date : null;
  const formattedHighestPriceDate = highestPriceDate
    ? format(highestPriceDate, "eee | MMM d | Y")
    : "";

  //Date for the lowest price

  const lowestPriceEntry = graphData.find(
    (entry) =>
      entry.Price === Math.min(...graphData.map((entry) => entry.Price))
  );
  const lowestPriceDate = lowestPriceEntry ? lowestPriceEntry.Date : null;
  const formattedlowestPriceDate = lowestPriceDate
    ? format(lowestPriceDate, "eee | MMM d | Y")
    : "";

  return (
    <Fragment>
      <h2 className={classes.coinTitle}>{coinName}</h2>

      <div className={classes.mainChartDiv}>
        <div className={classes.hl}>
          <Button className={classes.hlButton} onClick={showHlHandler}>
            {`${showHl ? "hide" : "show"} HL Details`}
          </Button>
        </div>
        <ResponsiveContainer width={containerWidth} height={370}>
          <AreaChart
            fontSize={10}
            data={graphData}
            margin={{
              top: 20,
              right: 0,
              left: XintervalRef.current ? 9 : 240,
              bottom: 20,
            }}
          >
            <Area
              dataKey="Price"
              stroke="#a6a2db"
              strokeWidth={1.5}
              fill="url(#GradColor)"
            />

            <CartesianGrid opacity={0.2} strokeDasharray="1" vertical={false} />

            <XAxis
              interval={XintervalRef.current ? 200 : 120}
              dataKey="Date"
              axisLine={false}
              tickLine={false}
              tickFormatter={(timeStr) => {
                const date = new Date(timeStr);
                const formattedDate = format(date, "d MMM / yy");

                return `${formattedDate}`;
              }}
              tick={{
                angle: -45,
                dy: 15,
                fill: "white",
                opacity: 0.8,
                fontSize: 10,
                fontWeight: "bold",
              }}
            />
            <YAxis
              tickCount={5}
              dataKey="Price"
              name="Price"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "white", opacity: 0.8 }}
              tickFormatter={(price) => {
                if (price >= 1000) {
                  return symb + price / 1000 + "K";
                }
                return symb + price.toFixed(2);
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            {highestPriceEntry && showHl && (
              <ReferenceDot
                x={highestPriceEntry.Date}
                y={highestPriceEntry.Price}
                r={3}
                fill="white"
                label={{
                  position: "top",
                  value: `${symb}${highestPriceEntry.Price.toFixed(
                    3
                  )} | ${formattedHighestPriceDate}`,
                  style: { fill: "white", fontSize: "8px" },
                }}
              />
            )}
            {lowestPriceEntry && showHl && (
              <ReferenceDot
                x={lowestPriceEntry.Date}
                y={lowestPriceEntry.Price}
                r={3}
                fill="white"
                label={{
                  position: "bottom",
                  value: `${symb}${lowestPriceEntry.Price.toFixed(
                    3
                  )} | ${formattedlowestPriceDate}`,
                  style: { fill: "white", fontSize: "8px" },
                }}
              />
            )}

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
              placeholder="chart days.."
              //onChange={changeDaysHandler}
              ref={daysRef}
              className={error && `${classes.err}`}
            />
            <button type="submit" className={classes.show}>
              show
            </button>
          </form>
          {/*{error}*/}
        </div>
      </div>

      <FetchEachCoin coin={coin} />
    </Fragment>
  );
};

export default CoinDetails;

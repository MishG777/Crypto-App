import React, { useRef } from "react";
import classes from "./PriceChangeByTime.module.css";

const PriceChangeByTime = ({ changedTime }) => {
  const timeRef = useRef("Volume 24h");
  //   console.log(timeRef);
  const changeTimeHandler = () => {
    const time = timeRef.current.value.split(" ");
    changedTime(time[1]);
  };

  return (
    <select
      ref={timeRef}
      onChange={changeTimeHandler}
      className={classes.timeChanger}
    >
      <option>Volume 24h</option>
      <option>Volume 1h</option>
      <option>Volume 7d</option>
      <option>Volume 14d</option>
      <option>Volume 30d</option>
      <option>Volume 200d</option>
      <option>Volume 1y</option>
    </select>
  );
};
//1h, 24h, 7d, 14d, 30d, 200d, 1y
export default PriceChangeByTime;

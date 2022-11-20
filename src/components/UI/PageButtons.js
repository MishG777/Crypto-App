import React from "react";
import classes from "./PageButtons.module.css";

const PageButtons = (props) => {
  return (
    <button onClick={props.onClick} className={classes.pageButtons}>
      {props.children}
    </button>
  );
};

export default PageButtons;

import React from "react";
import classes from "./Signup.module.css";

const Singup = () => {
  return (
    <form className={classes.mainForm}>
      <div className={classes.flexClass}>
        <label htmlFor="name">Name</label>
        <input type="text" />
      </div>

      <div className={classes.flexClass}>
        <label htmlFor="surname">Surname</label>
        <input type="text" />
      </div>

      <div className={classes.flexClass}>
        <label htmlFor="Gmail">Gmail</label>
        <input type="mail" />
      </div>

      <div className={classes.flexClass}>
        <label htmlFor="password">password</label>
        <input type="password" />
      </div>
      <div>
        <button className={classes.registrBtn}>Sign Up</button>
      </div>
      <div className={classes.otherSigns}>
        <button>Sign Up with Gmail</button>
        <button>Sign Up with Binance</button>
        <button>Sign Up with Gmail</button>
      </div>
    </form>
  );
};

export default Singup;

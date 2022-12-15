import React, { Fragment, useState } from "react";
import Uselogin from "../../hooks/use-login";
import classes from "./Login.module.css";

import Button from "../UI/Button";
import Singup from "./Singup";

const LogIn = ({ logInHandler }) => {
  const [onAuthPage, setOnAuthPage] = useState(true);

  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    reset: resetNameInput,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = Uselogin((value) => value.trim() !== "" && value.length >= 8);

  const {
    value: enteredEmail,
    hasError: emailInpuHasError,
    isValid: enteredEmailIsValid,
    reset: resetEmailInput,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = Uselogin(
    (value) =>
      value.includes("@") && !value.startsWith("@") && value.trim() !== ""
  );

  let formIsValid = false;

  if (enteredEmailIsValid && enteredNameIsValid) {
    formIsValid = true;
  }

  //Main form submission
  const formSubmissionHandler = (e) => {
    e.preventDefault();

    if (!enteredEmailIsValid && !enteredNameIsValid) {
      return;
    }
    logInHandler();
    console.log(enteredName);
    console.log(enteredEmail);

    resetNameInput();
    resetEmailInput();
  };

  const startsWithError = enteredEmail.startsWith("@"); //if email starts with '@'

  const OnButtonClick = () => {};

  //when we click/focus on form

  const authHandler = () => {
    setOnAuthPage(true);
  };

  const registrHandler = () => {
    setOnAuthPage(false);
  };

  return (
    <Fragment>
      <form onSubmit={formSubmissionHandler} className={classes.mainForm}>
        <div className={classes.authTitle}>
          <h3>{onAuthPage ? "Authorization" : "Registration"}</h3>
        </div>

        {onAuthPage && (
          <Fragment>
            <div className={classes["form-control"]}>
              <label htmlFor="email">Gmail</label>
              <input
                type="text"
                id="email"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                className={classes.input}
              />
              {emailInpuHasError && (
                <span className={classes["error-text"]}>
                  Email must not be empty and should contain '@' symbol.
                </span>
              )}
              {!emailInpuHasError && startsWithError && (
                <span className={classes["error-text"]}>
                  Email cannot be started with '@' symbol.
                </span>
              )}
            </div>
            {/* Password */}
            <div className={classes["form-control"]}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                value={enteredName}
                className={classes.input}
              />
              {nameInputHasError && (
                <span className={classes["error-text"]}>
                  please enter valid password longer then 8 symbols!
                </span>
              )}
            </div>
            <div className={classes["form-actions"]}>
              <button
                onClick={OnButtonClick}
                disabled={!formIsValid}
                className={classes.loginBtn}
              >
                Submit
              </button>
            </div>
          </Fragment>
        )}

        {/* On registration */}
        {!onAuthPage && <Singup />}

        <div className={classes.authButtons}>
          <Button onClick={authHandler} className={classes.auth}>
            Authorization
          </Button>
          <Button onClick={registrHandler} className={classes.registr}>
            Registration
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default LogIn;

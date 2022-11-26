import React, { Fragment, useState } from "react";
import Uselogin from "../../hooks/use-login";
import classes from "./Login.module.css";
import { Prompt } from "react-router-dom";
import Button from "../UI/Button";

const LogIn = ({ logInHandler }) => {
  const [isEntering, setIsEntering] = useState(false);

  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    reset: resetNameInput,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = Uselogin((value) => value.trim() !== "");

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

  const OnButtonClick = () => {
    setIsEntering(false);
  };

  //when we click/focus on form
  const formFocusHandler = () => {
    setIsEntering(true);
    console.log("focused");
  };

  // const emailInputClasses = emailInpuHasError
  //   ? classes["form-control invalidmail"]
  //   : classes["form-control"];

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={() =>
          "Are you sure you want to leave, all the data will be lost"
        }
      />
      <form
        onSubmit={formSubmissionHandler}
        onFocus={formFocusHandler}
        className={classes.mainForm}
      >
        {/* Name */}
        <div className={classes["form-control"]}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
            className={classes.input}
          />
          {nameInputHasError && (
            <span className={classes["error-text"]}>
              please enter valid name!
            </span>
          )}
        </div>

        {/* Email */}
        <div className={classes["form-control"]}>
          <label htmlFor="email">Your E-mail</label>
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

        <div className={classes["form-actions"]}>
          <Button
            onClick={OnButtonClick}
            disabled={!formIsValid}
            className={classes.loginBtn}
          >
            Submit
          </Button>
        </div>

        <div className={classes.authButtons}>
          <Button className={classes.auth}>Authorization</Button>
          <Button className={classes.registr}>Registration</Button>
        </div>
      </form>
    </Fragment>
  );
};

export default LogIn;

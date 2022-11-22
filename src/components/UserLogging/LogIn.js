import React, { Fragment, useState } from "react";
import Uselogin from "../../hooks/use-login";
import classes from "./Login.module.css";
import { Prompt } from "react-router-dom";

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

  const nameInputClasses = nameInputHasError
    ? classes["form-control invalid"]
    : classes["form-control"];

  const emailInputClasses = emailInpuHasError
    ? classes["form-control invalidmail"]
    : classes["form-control"];

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={() =>
          "Are you sure you want to leave, all the data will be lost"
        }
      />
      <form onSubmit={formSubmissionHandler} onFocus={formFocusHandler}>
        {/* Name */}
        <div className={nameInputClasses}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
          />
          {nameInputHasError && (
            <p className={classes["error-text"]}>please enter valid name!</p>
          )}
        </div>

        <div className={emailInputClasses}>
          {/* Email */}
          <label htmlFor="email">Your E-mail</label>
          <input
            type="text"
            id="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInpuHasError && (
            <p className={classes["error-text"]}>
              Email must not be empty and should contain '@' symbol.
            </p>
          )}
          {!emailInpuHasError && startsWithError && (
            <p className={classes["error-text"]}>
              Email cannot be started with '@' symbol.
            </p>
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
      </form>
    </Fragment>
  );
};

export default LogIn;

import React from "react";
import Uselogin from "../../hooks/use-login";
import classes from "./Login.module.css";

const LogIn = ({ logInHandler }) => {
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

  const formSubmissionHandler = (e) => {
    logInHandler();
    e.preventDefault();

    if (!enteredEmailIsValid && !enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);

    resetNameInput();
    resetEmailInput();
  };

  const startsWithError = enteredEmail.startsWith("@");

  const nameInputClasses = nameInputHasError
    ? classes["form-control invalid"]
    : classes["form-control"];

  const emailInputClasses = emailInpuHasError
    ? classes["form-control invalidmail"]
    : classes["form-control"];

  return (
    <form onSubmit={formSubmissionHandler}>
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
        <button disabled={!formIsValid} className={classes.loginBtn}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default LogIn;

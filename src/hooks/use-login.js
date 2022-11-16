import { useReducer } from "react";

const initialValue = {
  value: "",
  isTouched: false,
};

const logInStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }

  return initialValue;
};

const Uselogin = (validateValue) => {
  const [loginState, dispatch] = useReducer(logInStateReducer, initialValue);

  const valueIsValid = validateValue(loginState.value);
  const hasError = !valueIsValid && loginState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: loginState.value,
    hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default Uselogin;

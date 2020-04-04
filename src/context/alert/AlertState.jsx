import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = props => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (message, type) => {
    // be careful here: you have to use curly braces in here.
    // But is that destructing or "consructing" an object? ==> it is the later
    // setAlert({ message, type });
    /// But here in the AlertState Change this to a dispatch

    dispatch({
      type: SET_ALERT,
      payload: { message, type }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT}), 4000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;

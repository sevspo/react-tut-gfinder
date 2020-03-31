import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alert = () => {
  //so just to make it clear what is going on when I ommit the destructing in the params.
  //const { alert } = props;

  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;

  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" /> {alert.message}
      </div>
    )
  );
};

export default Alert;

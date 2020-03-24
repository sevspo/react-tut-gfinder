import React from "react";

const Alert = props => {
  //so just to make it clear what is going on when I ommit the destructing in the params.
  const { alert } = props;

  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle"></i> {alert.message}
      </div>
    )
  );
};

export default Alert;

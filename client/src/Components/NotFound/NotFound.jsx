import React from "react";
import { useHistory } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/menu");
  };
  return (
    <div className="not-found">
      <div className="invisible-container" onClick={handleClick} />
    </div>
  );
};

export default NotFound;

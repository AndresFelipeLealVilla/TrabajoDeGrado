import React from "react";
import './ProgressBar.css'

const ProgressBar = ({ width }) => (
  <div className="outer">
    <div
      className="inner"
      style={{
        width: `${width}%`,
        backgroundColor: width === 100 ? "#e84118" : "#4cd137"
      }}
    />
  </div>
);

export default ProgressBar;
import React from "react";

const ProyeccionProgress = ({ width }) => (
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

export default ProyeccionProgress;
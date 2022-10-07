import React from "react";

const ProgressButton = ({ makeProgress, progress }) => (
  <button className="botontempo"
    onClick={makeProgress}
    style={{
      color: progress === 100 ? "#e84118" : "Black"
    }}
  >
    {progress === 100 ? "Again!" : "+ Cargar"}
  </button>
);

export default ProgressButton;
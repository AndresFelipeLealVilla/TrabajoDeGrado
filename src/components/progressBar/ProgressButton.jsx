import React from "react";

const ProgressButton = ({ makeProgress, progress }) => (
  <button className="botontempo"
    onClick={makeProgress}
    style={{
      color: progress === 100 ? "#e84118" : "white"
    }}
  >
    {progress === 100 ? "Again!" : "+ DAYZ ME AT HOME ALONE CODING"}
  </button>
);

export default ProgressButton;
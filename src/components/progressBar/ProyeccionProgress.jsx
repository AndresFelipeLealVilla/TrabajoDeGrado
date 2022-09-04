import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import ProgressButton from "./ProgressButton";
import './ProgressBar.css'

const ProyeccionProgress = () => {
  const [state, setState] = useState(20);
  return (
    <>
      <h2 className="porcentaje"
        style={{
          color: state === 100 ? "#e84118" : "white"
        }}
      >
        {state === 100
          ? `100%, WANT FUCKING TRAVEL!!!! HELL NAH!`
          : `${state}%`}
      </h2>
      <ProgressBar width={state} />
      <ProgressButton
        progress={state}
        makeProgress={() => {
          state < 100 ? setState(state + 20) : setState(20);
        }}
      />
    </>
  );
};

export default ProyeccionProgress;
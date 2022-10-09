import React, { useState } from "react";
import ProgressButton from "./ProgressButton";
import ProyeccionProgress from "./ProyeccionProgress";
import './ProgressBar.css';

function ProgressBar() {
  const [state, setState] = useState();

  return (
    
    <div className="contenedorBarra">
      <h2 className="porcentaje"
        style={{
          color: state === 100 ? "#e84118" : "Black"
        }}
      >
        {state === 100
          ? "Completo"
          : `${state}%`}
      </h2>
      <ProyeccionProgress width={state} />
      <ProgressButton
        progress={state}
        makeProgress={() => {
          state < 100 ? setState(state + 20) : setState(0);
        }}
      />
    </div>
  );
};

export default ProgressBar;
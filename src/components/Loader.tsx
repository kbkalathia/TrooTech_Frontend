import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

const Loader = () => {
  return (
    <div className="card flex items-center justify-center min-h-screen">
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
    </div>
  );
};

export default Loader;

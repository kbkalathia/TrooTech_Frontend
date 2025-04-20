import React from "react";
import { Toaster } from "react-hot-toast";

const Toast = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerStyle={{ zIndex: "999999999999", fontSize: "18px" }}
    />
  );
};

export default Toast;

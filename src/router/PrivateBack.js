import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateBack({ children }) {
  const location = useLocation();
  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default PrivateBack;
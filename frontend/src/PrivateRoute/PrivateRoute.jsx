import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopConext";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const {token} = useContext(ShopContext);

  return token === "" ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    children
  );
}

export default PrivateRoute

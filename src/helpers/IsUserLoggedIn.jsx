import React from "react";
import { Navigate } from "react-router-dom";
import useAuthListener from "../hooks/useAuthListener";

const IsUserLoggedIn = ({ children }) => {
  const { user } = useAuthListener();
  if (user) return <Navigate to={"/"} />;
  return children;
};

export default IsUserLoggedIn;

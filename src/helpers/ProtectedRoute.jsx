import React from "react";
import { Navigate } from "react-router-dom";
import useAuthListener from "../hooks/useAuthListener";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthListener();
  // you can return loading from useAuthListener and use it in this component
  if (!user) return <Navigate to={"/sign-in"} />;
  return children;
};

export default ProtectedRoute;

import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex pt-36 justify-center h-screen w-screen">
      <div className="flex flex-col gap-12">
        <h3 className="text-3xl font-semibold">Page not found</h3>
        <button
          className="block bg-gray-600 text-xl text-white px-3 py-2 rounded-md"
          onClick={() => navigate("/")}
        >
          Back to Home page
        </button>
      </div>
    </div>
  );
};

export default NotFound;

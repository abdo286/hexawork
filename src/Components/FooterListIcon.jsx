import React from "react";
import { useNavigate } from "react-router-dom";

const FooterListIcon = ({ Icon, to }) => {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(to)}
      className="hover:bg-[#EEEBE1] px-3 py-2 w-fit rounded-md"
    >
      <Icon className="text-2xl cursor-pointer " />
    </li>
  );
};

export default FooterListIcon;

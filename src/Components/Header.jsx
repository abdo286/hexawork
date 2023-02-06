import Logo from "../images/logo.avif";
import HeaderListItem from "./HeaderListItem";
import { useState } from "react";
import { HeaderItemsData } from "../constants/constants";
import { useLocation, useNavigate } from "react-router-dom";
import SignedMenu from "./SignedMenu";

const headerPages = ["/", "/pricing", "/about"];

const getCurrentActiveListItem = (pathname) => {
  if (headerPages.includes(pathname)) {
    if (pathname === "/") return HeaderItemsData[0].id;
    const currentActiveItem = HeaderItemsData.find(
      (cur) => cur.text.toLowerCase() === pathname.slice(1)
    );
    return currentActiveItem ? currentActiveItem.id : null;
  }
  return null;
};

const Header = () => {
  const location = useLocation();
  const [currentActiveListItem, setCurrentActiveListItem] = useState(
    getCurrentActiveListItem(location.pathname)
  );
  const handleClick = (id) => {
    setCurrentActiveListItem(id);
  };
  const navigate = useNavigate();
  return (
    <div className="shadow-md fixed left-0 right-0 z-[100000] bg-white top-0">
      <div className="flex justify-between items-center max-w-[80%] mx-auto">
        <div
          className="w-12 flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="header logo" className="w-full" />
          <h3 className="text-2xl text-gray-800">Hexaworks</h3>
        </div>
        <ul className="flex gap-12 items-center">
          {HeaderItemsData.map((cur) => (
            <HeaderListItem
              key={cur.id}
              text={cur.text}
              to={cur.to}
              id={cur.id}
              handleClick={handleClick}
              currentActiveListItem={currentActiveListItem}
            />
          ))}
        </ul>
        <SignedMenu />
      </div>
    </div>
  );
};

export default Header;

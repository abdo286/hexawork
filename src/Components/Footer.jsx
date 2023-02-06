import Logo from "../images/logo.avif";
import FooterListItem from "./FooterListItem";
import {
  Features,
  Resources,
  Company,
  FooterIcons,
} from "../constants/FooterData";
import FooterListIcon from "./FooterListIcon";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="py-24 mb-16 border-t-2 mt-20 ">
      <div className="grid grid-cols-6 w-[80%] mx-auto">
        <div className="col-span-2">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-12 flex items-center gap-3">
              <img src={Logo} alt="header logo" className="w-full" />
            </div>
            <h3 className="text-2xl text-gray-800 text-center">Hexaworks</h3>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4 px-3 py-2">Features</h3>
          <ul className="flex flex-col">
            {Features.map((cur) => (
              <FooterListItem key={cur.id} text={cur.text} to={cur.to} />
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4 px-3 py-2">Resources</h3>
          <ul className="flex flex-col">
            {Resources.map((cur) => (
              <FooterListItem key={cur.id} text={cur.text} to={cur.to} />
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4 px-3 py-2">Company</h3>
          <ul className="flex flex-col">
            {Company.map((cur) => (
              <FooterListItem key={cur.id} text={cur.text} to={cur.to} />
            ))}
          </ul>
        </div>
        <div>
          <ul className="flex flex-col">
            {FooterIcons.map((cur) => (
              <FooterListIcon key={cur.id} Icon={cur.Icon} to={cur.to} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

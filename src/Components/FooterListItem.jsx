import { Link } from "react-router-dom";

const FooterListItem = ({ to, text }) => {
  return (
    <li className="hover:bg-[#EEEBE1] px-3 py-2 rounded-md w-fit">
      <Link to={to}> {text}</Link>
    </li>
  );
};

export default FooterListItem;



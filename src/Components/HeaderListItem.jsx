import { Link } from "react-router-dom";

const HeaderListItem = ({
  text,
  to,
  id,
  handleClick,
  currentActiveListItem,
}) => {
  return (
    <li
      className={`relative h-full after:content-['']  after:w-12 ${
        currentActiveListItem === id ? "after:h-1" : null
      }    after:bg-green-700 block after:absolute after:-bottom-3`}
      onClick={() => handleClick(id)}
    >
      <Link
        to={to}
        className="block text-lg font-medium hover:text-green-600 transition-text  duration-150 ease-out h-full"
      >
        {text}
      </Link>
    </li>
  );
};

export default HeaderListItem;

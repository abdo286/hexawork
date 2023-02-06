import { TfiSearch } from "react-icons/tfi";
import { useAppContext } from "../context/AppContext";

const Searchbar = () => {
  const {searchTerm, update_searchTerm}=useAppContext()
  return (
    <div className="flex justify-center relative pl-20 mb-12 ">
      <div className="w-96 border-2 shadow-md py-2 rounded-xl mb-5 flex items-center relative">
        <input
          type=""
          name=""
          value={searchTerm}
          onChange={(e) => update_searchTerm(e.target.value)}
          className="w-[90%] px-3 border-none outline-none"
          placeholder="Search"
        />
        <div className="bg-gray-700 p-2 rounded-full absolute right-0 shadow-2xl">
          <TfiSearch className="text-xl cursor-pointer text-white " />
        </div>
      </div>
    </div>
  );
};

export default Searchbar;

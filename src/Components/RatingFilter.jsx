import { BsFillStarFill, BsStar } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
const rates = [1, 2, 3, 4, 5];

const RatingFilter = ({ rating = 0, updateFilters }) => {
  return (
    <div className="mt-6 mb-12">
      <p className="capitalize">Rate</p>
      <div className="flex gap-3 mt-3 items-center">
        {rates.map((cur) => {
          if (cur <= rating)
            return (
              <BsFillStarFill
                key={cur}
                className="text-xl cursor-pointer text-yellow-300"
                onClick={() => updateFilters("rating", cur)}
              />
            );
          else
            return (
              <BsStar
                key={cur}
                className="text-xl cursor-pointer"
                onClick={() => updateFilters("rating", cur)}
              />
            );
        })}
        <div className="bg-white px-1 rounded-full relative left-5">
          <AiOutlineClose
            className=" text-black text-2xl cursor-pointer"
            onClick={() => updateFilters("rating", 0)}
          />
        </div>
      </div>
    </div>
  );
};

export default RatingFilter;

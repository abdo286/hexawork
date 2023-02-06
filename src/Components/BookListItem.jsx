import React from "react";
import { useNavigate } from "react-router-dom";
import { BsStar, BsFillStarFill } from "react-icons/bs";
import { nanoid } from "nanoid";

const BookListItem = ({ cur }) => {
  const rates = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  return (
    <article
      key={cur.id}
      className="w-fit h-fit cursor-pointer border-2 border-gray-300cursor-pointer shadow-md hover:shadow-xl duration-200 ease-in-out hover:scale-[1.1] transition-transform"
      onClick={() => navigate(cur.id)}
    >
      <div className="w-64 h-48 w-30">
        <img
          src={cur.imageSrc}
          alt={`${cur.name} category`}
          className="w-full rounded-sm h-full object-cover"
        />
      </div>
      <div className="bg-gray-600 text-gray-100 pl-3 pb-3  ">
        <div className="mb-3 flex flex-col justify-between overflow-hidden">
          <h3 className="text-start text-xl font-semibold py-3 max h-20 max-h-[30] overflow-hidden">
            {cur.title}
          </h3>
          <div className="flex gap-1 mr-3 ">
            {rates.map((curIcon) =>
              curIcon <= cur.rating ? (
                <BsFillStarFill
                  key={curIcon}
                  className="text-xl cursor-pointer"
                />
              ) : (
                <BsStar key={curIcon} className="text-xl cursor-pointer" />
              )
            )}
          </div>
        </div>
        <p className="text-sm mr-0 limit-text h-20 max-h-32 overflow-hidden flex-grow bg-gray-600">
          {cur.description}
        </p>
        <div className="grid grid-cols-4 overflow-hidden gap-x-1 gap-y-3  pt-6  h-20 max-h-[30]">
          {cur.labels.map((label) => (
            <p
              key={nanoid()}
              className="bg-green-500 whitespace-nowrap w-fit h-fit px-3 py-1 rounded-full"
            >
              {label}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BookListItem;

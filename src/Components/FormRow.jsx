import React, { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
const FormRow = ({ category, options, updateFilters }) => {
  const [isOptionsShown, setIsOptionsShown] = useState(true);
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-1">
        <h3 className="capitalize">{category}</h3>
        {isOptionsShown ? (
          <AiOutlineMinusCircle
            className="text-xl cursor-pointer"
            onClick={() => setIsOptionsShown(false)}
          />
        ) : (
          <AiOutlinePlusCircle
            className="text-xl cursor-pointer"
            onClick={() => setIsOptionsShown(true)}
          />
        )}
      </div>
      <div
        className={`${isOptionsShown ? "max-h-[200rem]" : "max-h-0"
          } overflow-hidden transition-maxHeight ease-in duration-150`}
      >
        {options.map((option) => {
          return (
            <div
              key={option.text}
              className="topic gap-5 flex items-center h-12 mt-0 capitalize"
            >
              <input
                type="checkbox"
                name="topic"
                checked={option.isSelected}
                className="topic w-5 h-5 cursor-pointer"
                onChange={() =>
                  updateFilters(category, option.text.toLocaleLowerCase())
                }
              />
              <label htmlFor="topic">{option.text}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FormRow;

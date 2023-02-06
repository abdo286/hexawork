import React from "react";

const CategorySearchbar = ({ updateFilters, searchTerm }) => {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search..."
        className="border-2 border-gray-500 rounded-md shadow-md px-3 py-1 w-96 text-base "
        value={searchTerm}
        onChange={(e) => updateFilters("searchTerm", e.target.value)}
      />
    </div>
  );
};

export default CategorySearchbar;
//description-title

import FormRow from "./FormRow";
import RatingFilter from "./RatingFilter";

const Filters = ({
  filters: { rating, languages, labels, authors },
  updateFilters,
  clearFilters,
}) => {
  return (
    <div className="mb-6 sticky top-[6rem] bottom-[1rem]  shadow-xl ml-16 w-fit max-h-[77vh] overflow-auto [&::-webkit-scrollbar]:w-3  [&::-webkit-scrollbar]:border-l-2 [&::-webkit-scrollbar]:border-[#e6ecf8] [&::-webkit-scrollbar-thumb]:bg-[#e32636] bg-[#0f2b3c]  text-white px-12 py-6 ">
      <header className="flex justify-between gap-12 mb-12 items-center">
        <h2 className="font-semibold mt-0 p-0">Filters</h2>
        <button
          className="w-fit px-3 cursor-pointer h-[1.875rem] mt-1 bg-[#4d3237] clear-btn border-none text-[#ff7e5d]"
          onClick={clearFilters}
        >
          clear all
        </button>
      </header>
      <FormRow
        category="languages"
        options={languages}
        updateFilters={updateFilters}
      />
       <FormRow
          category="labels"
        options={labels}
        updateFilters={updateFilters}
      />
      <FormRow
        category="authors"
         options={authors}
        updateFilters={updateFilters}
      />
      <RatingFilter updateFilters={updateFilters} rating={rating} />
    </div>
  );
};
export default Filters;

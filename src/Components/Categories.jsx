import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Loading from "../Pages/Loading";

const Categories = () => {
  const { filteredCategories: categories, categoriesLoading } = useAppContext();
  const navigate = useNavigate();

  if (categoriesLoading) {
    return <Loading />;
  }

  if (!categories || categories.length < 1)
    return (
      <div className="h-[60vh] flex flex-col items-center ml-24 gap-8">
        <h3 className="text-xl font-medium">Your Library is empty</h3>
        <button
          className="px-3 py-[0.5rem] rounded-md border-2 bg-gray-700 text-white border-gray-300"
          onClick={() => navigate("/add-category")}
        >
          Add New Category
        </button>
      </div>
    );
  return (
    <>
      <div className="grid grid-cols-4 w-[80%] mx-auto my-12 gap-x-6 gap-y-12 justify-center items-center ">
        {categories.map((cur) => {
          let to = "categories/" + cur.to;
          return (
            <Link key={cur.id} className="w-fit" to={to}>
              <article
                key={cur.id}
                className="w-fit shadow-sm hover:shadow-xl transition-shadow duration-150 ease-in-out"
              >
                <div className="w-64 max-w-30">
                  <img
                    src={cur.imageSrc}
                    alt={`${cur.name} category`}
                    className="w-full rounded-sm h-48 object-cover"
                  />
                </div>
                <p className="bg-gray-200 text-center font-medium py-3 max-w-20 overflow-hidden">
                  {cur.name}
                </p>
              </article>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center !mt-48">
        <p
          className="bg-gray-700 text-white px-5 py-1 rounded-md cursor-pointer"
          onClick={() => navigate("/add-category")}
        >
          Add Category
        </p>
      </div>
    </>
  );
};

export default Categories;

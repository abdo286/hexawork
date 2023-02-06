import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import useBooks from "../hooks/useBooks";
import Loading from "./Loading";
import {
  BookListItem,
  CategoryFilters,
  CategorySearchbar,
} from "../Components";
import {
  getLanguages,
  getAuthorsNames,
  getLabels,
} from "../Utils/getFiltersValues";
import reducer from "../reducers/filters_reducer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const initialState = {
  books: [],
  filteredBooks: [],
  filters: {
    languages: [],
    labels: [],
    authors: [],
    // 0 means all the rates
    rating: 0,
    searchTerm: "",
  },
};
const Category = () => {
  const { id } = useParams();
  const { categories } = useAppContext();
  const [category, setCategory] = useState(null);
  const { books, booksLoading } = useBooks(id);
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const updateFilters = (filterType, text) => {
    dispatch({ type: "update_filters", payload: { filterType, text } });
  };

  const clearFilters = () => {
    dispatch({ type: "clear_filters" });
  };

  useEffect(() => {
    dispatch({ type: "filter_books" });
  }, [state.filters]);

  useEffect(() => {
    const languages = getLanguages(books);
    const labels = getLabels(books);
    const authors = getAuthorsNames(books);
    dispatch({
      type: "set_state",
      payload: {
        books,
        filteredBooks: books,
        filters: {
          languages,
          labels,
          authors,
          rating: 0,
          searchTerm: "",
        },
      },
    });
  }, [books]);

  useEffect(() => {
    if (id) {
      setCategory(
        categories.find(
          (cur) => cur.name.toLowerCase() === id.toLowerCase() || null
        )
      );
    }
  }, [id, categories, books]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute top-20"
      >
        <path
          fill="#3f5563cd"
          fillOpacity="1"
          d="M0,288L48,272C96,256,192,224,288,186.7C384,149,480,107,576,85.3C672,64,768,64,864,90.7C960,117,1056,171,1152,176C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>

      <div className="min-h-[55vh] relative top-28 pr-20 mb-32">
        <CategorySearchbar
          updateFilters={updateFilters}
          searchTerm={state.filters.searchTerm}
        />
        <div className="grid grid-cols-[3fr_7fr] ">
          <div>
            <CategoryFilters
              filters={state.filters}
              updateFilters={updateFilters}
              clearFilters={clearFilters}
            />
          </div>
          {booksLoading ? (
            <Loading />
          ) : !books || books.length < 1 ? (
            <div className="h-[60vh] flex flex-col items-center ml-24 gap-8 relative top-32">
              <h3 className="text-xl font-medium">
                There is no books added to this category
              </h3>
              <button
                className="px-3 py-[0.5rem] rounded-md border-2 bg-gray-700 text-white border-gray-300"
                onClick={() => navigate("/add-book")}
              >
                Add New Book
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 w-[80%] mx-auto my-0 gap-x-12 gap-y-12  mt-12">
              {state.filteredBooks.map((cur) => {
                return <BookListItem key={cur.id} cur={cur} />;
              })}
            </div>
          )}
        </div>
        <div className="flex justify-center absolute top-0 left-16">
          <p
            className="bg-gray-700 text-white px-5 py-1 rounded-md cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon/>
          </p>
        </div>
      </div>
      <div className="flex justify-center relative top-20 mb-32">
        <p
          className="bg-gray-700 text-white px-5 py-1 rounded-md cursor-pointer"
          onClick={() => navigate("/add-book")}
        >
          Add Book
        </p>
      </div>
    </>
  );
};

export default Category;

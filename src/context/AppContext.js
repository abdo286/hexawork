import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/app_reducer";
import useCategories from "../hooks/useCategories";
const initialState = {
  categories: [],
  filteredCategories: [],
  searchTerm: "",
};

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { categories, categoriesLoading } = useCategories();

  useEffect(() => {
    if (!categoriesLoading) {
      dispatch({ type: "setCategoriesData", payload: categories });
    }
  }, [categories, categoriesLoading]);
  useEffect(() => {
    dispatch({ type: "filter_categories" });
  }, [state.searchTerm]);

  const update_searchTerm = (searchTerm) => {
    dispatch({ type: "update_searchTerm", payload: searchTerm });
  };

  return (
    <AppContext.Provider
      value={{ ...state, categories, categoriesLoading, update_searchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

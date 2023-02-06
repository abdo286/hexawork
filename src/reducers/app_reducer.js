const app_reducer = (state, action) => {
  if (action.type === "setCategoriesData") {
    return {
      ...state,
      categories: action.payload,
      filteredCategories: action.payload,
    };
  }

  if (action.type === "update_searchTerm") {
    return { ...state, searchTerm: action.payload };
  }

  if (action.type === "filter_categories") {
    if (!state.searchTerm) {
      return {
        ...state,
        filteredCategories: state.categories,
      };
    }
    return {
      ...state,
      filteredCategories: state.categories.filter((cur) =>
        cur.name.toLowerCase().startsWith(state.searchTerm.toLowerCase())
      ),
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default app_reducer;

const app_reducer = (state, action) => {
  if (action.type === "set_state") {
    return { ...action.payload };
  }
  if (action.type === "update_filters") {
    if (
      action.payload.filterType === "searchTerm" ||
      action.payload.filterType === "rating"
    ) {
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.filterType]: action.payload.text,
        },
      };
    }

    const updatedFilterType = state.filters[
      action.payload.filterType.toLowerCase()
    ].map((cur) => {
      return cur.text.toLowerCase() === action.payload.text.toLowerCase()
        ? { ...cur, isSelected: !cur.isSelected }
        : cur;
    });
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.payload.filterType.toLowerCase()]: updatedFilterType,
      },
    };
  }

  if (action.type === "clear_filters") {
    const languages = state.filters.languages.map((cur) => ({
      ...cur,
      isSelected: false,
    }));
    const labels = state.filters.labels.map((cur) => ({
      ...cur,
      isSelected: false,
    }));
    const authors = state.filters.authors.map((cur) => ({
      ...cur,
      isSelected: false,
    }));

    return {
      ...state,
      filters: { ...state.filters, languages, labels, authors, rating: 0 },
    };
  }

  if (action.type === "filter_books") {
    const {
      languages: languagesData,
      labels: labelsData,
      authors: authorsData,
      rating,
      searchTerm,
    } = state.filters;
    let languages = languagesData
      .filter((cur) => cur.isSelected)
      .map((cur) => cur.text);
    let labels = labelsData
      .filter((cur) => cur.isSelected)
      .map((cur) => cur.text);
    let authors = authorsData
      .filter((cur) => cur.isSelected)
      .map((cur) => cur.text);
    let newBooks = state.books;
    if (searchTerm.length > 0) {
      newBooks = state.books.filter((cur) =>
        cur.title.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }
    if (languages.length > 0) {
      newBooks = newBooks.filter((book) =>
        languages.includes(book.language.toLowerCase())
      );
    }

    if (labels.length > 0) {
      newBooks = newBooks.filter((book) => {
        for (let label of book.labels) {
          if (labels.includes(label.toLowerCase())) return true;
        }
        return false;
      });
    }

    if (authors.length > 0) {
      newBooks = newBooks.filter((book) => {
        for (let author of book.authorsNames) {
          if (authors.includes(author.toLowerCase())) return true;
        }
        return false;
      });
    }

    if (Number(rating) !== 0) {
      newBooks = newBooks.filter(
        (book) => Number(book.rating) === Number(rating)
      );
    }
    return { ...state, filteredBooks: newBooks };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default app_reducer;

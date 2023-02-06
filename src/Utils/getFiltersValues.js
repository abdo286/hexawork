// use map instead array
export const getLanguages = (books) => {
  let languages = [...new Set(books.map((cur) => cur.language))];
  return languages.map((cur) => ({
    text: cur.toLowerCase(),
    isSelected: false,
  }));
};
export const getLabels = (books) => {
  const labels = [...new Set(books.map((cur) => cur.labels).flat())];
  return labels.map((cur) => ({ text: cur.toLowerCase(), isSelected: false }));
};
export const getAuthorsNames = (books) => {
  const authors = [...new Set(books.map((cur) => cur.authorsNames).flat())];
  return authors.map((cur) => ({ text: cur.toLowerCase(), isSelected: false }));
};

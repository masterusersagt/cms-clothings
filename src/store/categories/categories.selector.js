import { createSelector } from "reselect";

export const selectCategoriesMap = (state) => {
  console.log('selector fired');

  return state.categories.categories.reduce((acc, category) => {
    console.log("select From Map:", category);
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
}
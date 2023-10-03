// импортируем createSelector из @reduxjs/toolkit, т.о. нет необходимости в установке reselect
// createSelector - мемоизированная функция, т.о. функция не вызывается повторно, если ни один из параметров не изменился
// createSelector - это функция, которая принимает 1 или несколько простых селекторов
// (селектор - функция, которая получает state и возвращает конкретное значение из state или некое расчетное значение),
// а также селектор, который получает извлеченные обычными селекторами значения
// и возвращает целевое значение
import { RootState } from "./store";

export const getAppStateMoviesPopular = (state: RootState) => {
  return state.app.moviesPopular;
};
export const getAppStateMoviesSearch = (state: RootState) => {
  return state.app.moviesSearch;
};
export const getAppStateQuery = (state: RootState) => {
  return state.app.query;
};
export const getAppStateGenres = (state: RootState) => {
  return state.app.genres;
};
export const getAppStateMovieDetail = (state: RootState) => {
  return state.app.movieDetail;
};
export const getAppStateMoviesRecommended = (state: RootState) => {
  return state.app.moviesRecommened;
};
export const getAppStateMoviesSimilar = (state: RootState) => {
  return state.app.moviesSimilar;
};
export const getAppStateMoviesFavorites = (state: RootState) => {
  return state.app.moviesFavorites;
};
export const getAppStateIsLoading = (state: RootState) => {
  return state.app.isLoading;
};
export const getAppStateError = (state: RootState) => {
  return state.app.error;
};
export const getAppStateMovieTrailer = (state: RootState) => {
  return state.app.movieTrailer;
};

// задаем интерфейсы согласно документации по ответам от API
export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface IMovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface ISpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}
interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}
interface IProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface IGenre {
  id: number;
  name: string;
}

export interface IAppState {
  moviesPopular: IApiResponseSuccess | IApiResponseFailure | undefined;
  moviesSearch: IApiResponseSuccess | IApiResponseFailure | undefined;
  query: string | undefined;
  genres: IGenre[] | IApiResponseFailure | undefined;
  movieDetail: IMovieDetail | IApiResponseFailure | undefined;
  moviesRecommened: IApiResponseSuccess | IApiResponseFailure | undefined;
  moviesSimilar: IApiResponseSuccess | IApiResponseFailure | undefined;
  moviesFavorites: number[];
  isLoading: boolean;
  error: string | undefined;
  movieTrailer: ITrailer | IApiResponseFailure | undefined;
}

export enum EActionTypes {
  SET_MOVIES_POPULAR = "SET_MOVIES_POPULAR",
  SET_MOVIES_SEARCH = "SET_MOVIES_SEARCH",
  SET_QUERY = "SET_QUERY",
  SET_GENRES = "SET_GENRES",
  SET_MOVIE_DETAIL = "SET_MOVIE_DETAIL",
  SET_MOVIES_RECOMMENDED = "SET_MOVIES_RECOMMENDED",
  SET_MOVIES_SIMILAR = "SET_MOVIES_SIMILAR",
  SET_MOVIE_FAVORITE = "SET_MOVIE_FAVORITE",
  SET_IS_LOADING = "SET_IS_LOADING",
  SET_ERROR = "SET_ERROR",
  DELETE_MOVIE_FAVORITE = "DELETE_MOVIE_FAVORITE",
  SET_MOVIE_TRAILER = "SET_MOVIE_TRAILER",
}

interface ISetMoviesPopularAction {
  type: EActionTypes.SET_MOVIES_POPULAR;
  payload: IApiResponseSuccess | IApiResponseFailure | undefined;
}
interface ISetMoviesSearchAction {
  type: EActionTypes.SET_MOVIES_SEARCH;
  payload: IApiResponseSuccess | IApiResponseFailure | undefined;
}
interface ISetQueryAction {
  type: EActionTypes.SET_QUERY;
  payload: string | undefined;
}
interface ISetGenresAction {
  type: EActionTypes.SET_GENRES;
  payload: IGenre[] | IApiResponseFailure | undefined;
}
interface ISetMovieDetailAction {
  type: EActionTypes.SET_MOVIE_DETAIL;
  payload: IMovieDetail | IApiResponseFailure | undefined;
}
interface ISetMoviesRecommendedAction {
  type: EActionTypes.SET_MOVIES_RECOMMENDED;
  payload: IApiResponseSuccess | IApiResponseFailure | undefined;
}
interface ISetMoviesSimilarAction {
  type: EActionTypes.SET_MOVIES_SIMILAR;
  payload: IApiResponseSuccess | IApiResponseFailure | undefined;
}
interface ISetMovieFavoriteAction {
  type: EActionTypes.SET_MOVIE_FAVORITE;
  payload: number;
}
interface IDeleteMovieFavoriteAction {
  type: EActionTypes.DELETE_MOVIE_FAVORITE;
  payload: number;
}
interface ISetIsLoadingAction {
  type: EActionTypes.SET_IS_LOADING;
  payload: boolean;
}
interface ISetErrorAction {
  type: EActionTypes.SET_ERROR;
  payload?: string | undefined;
}
interface ISetMovieTrailer {
  type: EActionTypes.SET_MOVIE_TRAILER;
  payload?: ITrailer | IApiResponseFailure | undefined;
}

export type TAppAction =
  | ISetMoviesPopularAction
  | ISetMoviesSearchAction
  | ISetQueryAction
  | ISetGenresAction
  | ISetMovieDetailAction
  | ISetMoviesRecommendedAction
  | ISetMoviesSimilarAction
  | ISetMovieFavoriteAction
  | IDeleteMovieFavoriteAction
  | ISetIsLoadingAction
  | ISetErrorAction
  | ISetMovieTrailer;

// "успешный" ответ от API
export interface IApiResponseSuccess {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
// "неудачный" ответ от API
export interface IApiResponseFailure {
  status_code: number;
  status_message: string;
  success: boolean;
}

export type TMoviesFavoritesData =
  | IMovieDetail
  | IApiResponseFailure
  | undefined;

export interface ITrailerDetail {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
export interface ITrailer {
  id: number;
  results: ITrailerDetail[];
}

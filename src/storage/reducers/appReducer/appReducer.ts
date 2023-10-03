import { TAppAction, EActionTypes, IAppState } from "./models";

// чтобы redux смог безошибочно инициализировать state в store, для каждого reducer необходимо определить
// initialState, который используется как значение параметра state в функции reducer по-умолчанию
const initialState: IAppState = {
  moviesPopular: undefined,
  moviesSearch: undefined,
  query: undefined,
  genres: undefined,
  movieDetail: undefined,
  moviesRecommened: undefined,
  moviesSimilar: undefined,
  moviesFavorites: [],
  isLoading: false,
  error: undefined,
  movieTrailer: undefined,
};

// reducer принимает 2 параметра: текуший state и объект action, а возвращает измененную КОПИЮ state
export const appReducer = (
  state: IAppState = initialState,
  // в качестве типа для action задаем собственный тип из нескольких возможных интерфейсов
  // каждый интерфейс соответствует конкретному type и payload
  action: TAppAction
): IAppState => {
  switch (action.type) {
    // чтобы не объявлять отдельные константы для типов actions - используем собственное перечисление ActionTypes
    case EActionTypes.SET_MOVIES_POPULAR:
      return {
        ...state,
        moviesPopular:
          typeof action.payload !== "undefined" && "page" in action.payload
            ? typeof state.moviesPopular !== "undefined" &&
              "page" in state.moviesPopular
              ? {
                  page: action.payload.page,
                  total_pages: action.payload.total_pages,
                  total_results: action.payload.total_results,
                  results: [
                    ...state.moviesPopular.results,
                    ...action.payload.results,
                  ],
                }
              : action.payload
            : action.payload,
      };
    case EActionTypes.SET_MOVIES_SEARCH:
      return {
        ...state,
        moviesSearch:
          typeof action.payload !== "undefined" && "page" in action.payload
            ? typeof state.moviesSearch !== "undefined" &&
              "page" in state.moviesSearch
              ? action.payload.page !== state.moviesSearch.page
                ? {
                    page: action.payload.page,
                    total_pages: action.payload.total_pages,
                    total_results: action.payload.total_results,
                    results: [
                      ...state.moviesSearch.results,
                      ...action.payload.results,
                    ],
                  }
                : action.payload
              : action.payload
            : action.payload,
      };
    case EActionTypes.SET_QUERY:
      return { ...state, query: action.payload };
    case EActionTypes.SET_GENRES:
      return { ...state, genres: action.payload };
    case EActionTypes.SET_MOVIE_DETAIL:
      return { ...state, movieDetail: action.payload };
    case EActionTypes.SET_MOVIES_RECOMMENDED:
      return {
        ...state,
        moviesRecommened:
          typeof action.payload !== "undefined" && "page" in action.payload
            ? typeof state.moviesRecommened !== "undefined" &&
              "page" in state.moviesRecommened
              ? {
                  page: action.payload.page,
                  total_pages: action.payload.total_pages,
                  total_results: action.payload.total_results,
                  results: [
                    ...state.moviesRecommened.results,
                    ...action.payload.results,
                  ],
                }
              : action.payload
            : action.payload,
      };
    case EActionTypes.SET_MOVIES_SIMILAR:
      return {
        ...state,
        moviesSimilar:
          typeof action.payload !== "undefined" && "page" in action.payload
            ? typeof state.moviesSimilar !== "undefined" &&
              "page" in state.moviesSimilar
              ? {
                  page: action.payload.page,
                  total_pages: action.payload.total_pages,
                  total_results: action.payload.total_results,
                  results: [
                    ...state.moviesSimilar.results,
                    ...action.payload.results,
                  ],
                }
              : action.payload
            : action.payload,
      };
    case EActionTypes.SET_MOVIE_FAVORITE:
      return {
        ...state,
        moviesFavorites: [...state.moviesFavorites, action.payload],
      };
    case EActionTypes.DELETE_MOVIE_FAVORITE:
      return {
        ...state,
        moviesFavorites: state.moviesFavorites.filter(
          (movie) => movie !== action.payload
        ),
      };
    case EActionTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case EActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case EActionTypes.SET_MOVIE_TRAILER:
      return { ...state, movieTrailer: action.payload };
    // если не было найдено ни одного совпадения, то reducer должен вернуть тот же state
    default:
      return state;
  }
};

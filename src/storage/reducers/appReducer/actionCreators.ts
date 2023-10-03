import { Dispatch } from "@reduxjs/toolkit";
import {
  TAppAction,
  EActionTypes,
  IGenre,
  IMovieDetail,
  IApiResponseSuccess,
  IApiResponseFailure,
  ITrailer,
} from "./models";
import {
  fetchDetail,
  fetchGenres,
  fetchPopular,
  fetchRecommended,
  fetchSearch,
  fetchSimilar,
  fetchTrailer,
} from "../../../services/api";

// это action creator - функция, которая может принимать параметры и всегда возвращает объект action
const SetMoviesPopularActionCreator = (
  payload: IApiResponseSuccess | IApiResponseFailure | undefined
) => ({
  type: EActionTypes.SET_MOVIES_POPULAR,
  payload: payload,
});
const SetMoviesSearchActionCreator = (
  payload: IApiResponseSuccess | IApiResponseFailure | undefined
) => ({
  type: EActionTypes.SET_MOVIES_SEARCH,
  payload: payload,
});
const SetQueryActionCreator = (payload: string | undefined) => ({
  type: EActionTypes.SET_QUERY,
  payload: payload,
});
const SetGenresActionCreator = (
  payload: IGenre[] | IApiResponseFailure | undefined
) => ({
  type: EActionTypes.SET_GENRES,
  payload: payload,
});
const SetMovieDetailActionCreator = (
  payload: IMovieDetail | IApiResponseFailure | undefined
) => ({
  type: EActionTypes.SET_MOVIE_DETAIL,
  payload: payload,
});
const SetMoviesRecommendedActionCreator = (
  payload: IApiResponseSuccess | IApiResponseFailure | undefined
) => ({
  type: EActionTypes.SET_MOVIES_RECOMMENDED,
  payload: payload,
});
const SetMoviesSimilarActionCreator = (
  payload: IApiResponseSuccess | IApiResponseFailure | undefined
) => ({
  type: EActionTypes.SET_MOVIES_SIMILAR,
  payload: payload,
});
const SetMovieFavoriteActionCreator = (payload: number) => ({
  type: EActionTypes.SET_MOVIE_FAVORITE,
  payload: payload,
});
const DeleteMovieFavoriteActionCreator = (payload: number) => ({
  type: EActionTypes.DELETE_MOVIE_FAVORITE,
  payload: payload,
});
const SetIsLoadingActionCreator = (payload: boolean) => ({
  type: EActionTypes.SET_IS_LOADING,
  payload: payload,
});
const SetErrorActionCreator = (payload: string | undefined) => ({
  type: EActionTypes.SET_ERROR,
  payload: payload,
});
const SetMovieTrailerActionCreator = (
  payload: ITrailer | IApiResponseFailure | undefined
) => ({
  type: EActionTypes.SET_MOVIE_TRAILER,
  payload: payload,
});

// это thunk action creator - функция, которая может принимать параметры и через замыкание
// позволит использовать эти параметры внутренней функции
// функция возвращает thunk - другую функцию, которая принимает dispatch из store
// thunk, как и action, диспатчатся в redux store, где и вызываются
// внутри thunk обычно диспатчатся другие thunk или ation, а также выполняются отложенно асинхронные запросы
// и прочие действия с side effets
const fetchPopularThunkCreator = (page: number) => {
  return async (dispatch: Dispatch<TAppAction>) => {
    try {
      dispatch(SetIsLoadingActionCreator(true) as TAppAction);

      const response: IApiResponseSuccess | IApiResponseFailure | string =
        await fetchPopular(page);

      if (typeof response === "string") {
        dispatch(SetErrorActionCreator(response) as TAppAction);
        dispatch(SetMoviesPopularActionCreator(undefined) as TAppAction);
      } else {
        if ("success" in response) {
          dispatch(
            SetErrorActionCreator(response.status_message) as TAppAction
          );
          dispatch(SetMoviesPopularActionCreator(response) as TAppAction);
        } else {
          dispatch(SetMoviesPopularActionCreator(response) as TAppAction);
          dispatch(SetErrorActionCreator(undefined) as TAppAction);
        }
      }

      dispatch(SetIsLoadingActionCreator(false) as TAppAction);
    } catch (error) {
      let errorMsg;

      if (typeof error === "string") {
        errorMsg = error;
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }

      dispatch(SetErrorActionCreator(errorMsg) as TAppAction);
      dispatch(SetMoviesPopularActionCreator(undefined) as TAppAction);
      dispatch(SetIsLoadingActionCreator(false) as TAppAction);
    }
  };
};
const fetchSearchThunkCreator = (page: number, query: string) => {
  return async (dispatch: Dispatch<TAppAction>) => {
    try {
      dispatch(SetIsLoadingActionCreator(true) as TAppAction);

      const response: IApiResponseSuccess | IApiResponseFailure | string =
        await fetchSearch(page, query);

      if (typeof response === "string") {
        dispatch(SetErrorActionCreator(response) as TAppAction);
        dispatch(SetMoviesSearchActionCreator(undefined) as TAppAction);
      } else {
        if ("success" in response) {
          dispatch(
            SetErrorActionCreator(response.status_message) as TAppAction
          );
          dispatch(SetMoviesSearchActionCreator(response) as TAppAction);
        } else {
          dispatch(
            SetMoviesSearchActionCreator({
              ...response,
              results: response.results.slice(0, 20),
            }) as TAppAction
          );
          dispatch(SetErrorActionCreator(undefined) as TAppAction);
        }
      }

      dispatch(SetIsLoadingActionCreator(false) as TAppAction);
    } catch (error) {
      let errorMsg;

      if (typeof error === "string") {
        errorMsg = error;
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }

      dispatch(SetErrorActionCreator(errorMsg) as TAppAction);
      dispatch(SetMoviesSearchActionCreator(undefined) as TAppAction);
      dispatch(SetIsLoadingActionCreator(false) as TAppAction);
    }
  };
};
const fetchRecommendedThunkCreator = (page: number, movieId: number) => {
  return async (dispatch: Dispatch<TAppAction>) => {
    try {
      dispatch(SetIsLoadingActionCreator(true) as TAppAction);

      const response: IApiResponseSuccess | IApiResponseFailure | string =
        await fetchRecommended(page, movieId);

      if (typeof response === "string") {
        dispatch(SetErrorActionCreator(response) as TAppAction);
        dispatch(SetMoviesRecommendedActionCreator(undefined) as TAppAction);
      } else {
        if ("success" in response) {
          dispatch(
            SetErrorActionCreator(response.status_message) as TAppAction
          );
          dispatch(SetMoviesRecommendedActionCreator(response) as TAppAction);
        } else {
          dispatch(
            SetMoviesRecommendedActionCreator({
              ...response,
              results: response.results.slice(0, 20),
            }) as TAppAction
          );
          dispatch(SetErrorActionCreator(undefined) as TAppAction);
        }
      }

      dispatch(SetIsLoadingActionCreator(false) as TAppAction);
    } catch (error) {
      let errorMsg;

      if (typeof error === "string") {
        errorMsg = error;
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }

      dispatch(SetErrorActionCreator(errorMsg) as TAppAction);
      dispatch(SetMoviesRecommendedActionCreator(undefined) as TAppAction);
      dispatch(SetIsLoadingActionCreator(false) as TAppAction);
    }
  };
};
const fetchSimilarThunkCreator = (page: number, movieId: number) => {
  return async (dispatch: Dispatch<TAppAction>) => {
    try {
      dispatch(SetIsLoadingActionCreator(true) as TAppAction);

      const response: IApiResponseSuccess | IApiResponseFailure | string =
        await fetchSimilar(page, movieId);

      if (typeof response === "string") {
        dispatch(SetErrorActionCreator(response) as TAppAction);
        dispatch(SetMoviesSimilarActionCreator(undefined) as TAppAction);
      } else {
        if ("success" in response) {
          dispatch(
            SetErrorActionCreator(response.status_message) as TAppAction
          );
          dispatch(SetMoviesSimilarActionCreator(response) as TAppAction);
        } else {
          dispatch(
            SetMoviesSimilarActionCreator({
              ...response,
              results: response.results.slice(0, 20),
            }) as TAppAction
          );
          dispatch(SetErrorActionCreator(undefined) as TAppAction);
        }
      }

      dispatch(SetIsLoadingActionCreator(false) as TAppAction);
    } catch (error) {
      let errorMsg;

      if (typeof error === "string") {
        errorMsg = error;
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }

      dispatch(SetErrorActionCreator(errorMsg) as TAppAction);
      dispatch(SetMoviesSimilarActionCreator(undefined) as TAppAction);
      dispatch(SetIsLoadingActionCreator(false) as TAppAction);
    }
  };
};
const fetchGenresThunkCreator = () => {
  return async (dispatch: Dispatch<TAppAction>) => {
    try {
      dispatch(SetIsLoadingActionCreator(true) as TAppAction);

      const response: { genres: IGenre[] } | IApiResponseFailure | string =
        await fetchGenres();

      if (typeof response === "string") {
        dispatch(SetErrorActionCreator(response) as TAppAction);
        dispatch(SetGenresActionCreator(undefined) as TAppAction);
      } else {
        if ("success" in response) {
          dispatch(
            SetErrorActionCreator(response.status_message) as TAppAction
          );
          dispatch(SetGenresActionCreator(response) as TAppAction);
        } else {
          dispatch(SetGenresActionCreator(response.genres) as TAppAction);
          dispatch(SetErrorActionCreator(undefined) as TAppAction);
        }
      }

      dispatch(SetIsLoadingActionCreator(false) as TAppAction);
    } catch (error) {
      let errorMsg;

      if (typeof error === "string") {
        errorMsg = error;
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }

      dispatch(SetErrorActionCreator(errorMsg) as TAppAction);
      dispatch(SetGenresActionCreator(undefined) as TAppAction);
      dispatch(SetIsLoadingActionCreator(false) as TAppAction);
    }
  };
};
const fetchDetailThunkCreator = (movieId: number) => {
  return async (dispatch: Dispatch<TAppAction>) => {
    try {
      dispatch(SetIsLoadingActionCreator(true) as TAppAction);

      const response: IMovieDetail | IApiResponseFailure | string =
        await fetchDetail(movieId);

      if (typeof response === "string") {
        dispatch(SetErrorActionCreator(response) as TAppAction);
        dispatch(SetMovieDetailActionCreator(undefined) as TAppAction);
      } else {
        if ("success" in response) {
          dispatch(
            SetErrorActionCreator(response.status_message) as TAppAction
          );
          dispatch(SetMovieDetailActionCreator(response) as TAppAction);
        } else {
          dispatch(SetMovieDetailActionCreator(response) as TAppAction);
          dispatch(SetErrorActionCreator(undefined) as TAppAction);
        }
      }

      dispatch(SetIsLoadingActionCreator(false) as TAppAction);
    } catch (error) {
      let errorMsg;

      if (typeof error === "string") {
        errorMsg = error;
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }

      dispatch(SetErrorActionCreator(errorMsg) as TAppAction);
      dispatch(SetMovieDetailActionCreator(undefined) as TAppAction);
      dispatch(SetIsLoadingActionCreator(false) as TAppAction);
    }
  };
};
const fetchTrailerThunkCreator = (movieId: number) => {
  return async (dispatch: Dispatch<TAppAction>) => {
    try {
      dispatch(SetIsLoadingActionCreator(true) as TAppAction);

      const response: ITrailer | IApiResponseFailure | string =
        await fetchTrailer(movieId);

      if (typeof response === "string") {
        dispatch(SetErrorActionCreator(response) as TAppAction);
        dispatch(SetMovieTrailerActionCreator(undefined) as TAppAction);
      } else {
        if ("success" in response) {
          dispatch(
            SetErrorActionCreator(response.status_message) as TAppAction
          );
          dispatch(SetMovieTrailerActionCreator(response) as TAppAction);
        } else {
          dispatch(SetMovieTrailerActionCreator(response) as TAppAction);
          dispatch(SetErrorActionCreator(undefined) as TAppAction);
        }
      }

      dispatch(SetIsLoadingActionCreator(false) as TAppAction);
    } catch (error) {
      let errorMsg;

      if (typeof error === "string") {
        errorMsg = error;
      } else if (error instanceof Error) {
        errorMsg = error.message;
      }

      dispatch(SetErrorActionCreator(errorMsg) as TAppAction);
      dispatch(SetMovieTrailerActionCreator(undefined) as TAppAction);
      dispatch(SetIsLoadingActionCreator(false) as TAppAction);
    }
  };
};

// скомбинируем все action creators в 1 объект
// создадим общий для всего приложения объект с action creators
const ActionCreators = {
  SetMoviesPopularActionCreator,
  SetMoviesSearchActionCreator,
  SetQueryActionCreator,
  SetGenresActionCreator,
  SetMovieDetailActionCreator,
  SetMoviesRecommendedActionCreator,
  SetMoviesSimilarActionCreator,
  SetMovieFavoriteActionCreator,
  DeleteMovieFavoriteActionCreator,
  SetIsLoadingActionCreator,
  SetErrorActionCreator,
  fetchPopularThunkCreator,
  fetchSearchThunkCreator,
  fetchRecommendedThunkCreator,
  fetchSimilarThunkCreator,
  fetchGenresThunkCreator,
  fetchDetailThunkCreator,
  SetMovieTrailerActionCreator,
  fetchTrailerThunkCreator,
};

export default ActionCreators;

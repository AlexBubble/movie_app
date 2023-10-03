import React, { useEffect, useState } from "react";
import MovieCard from "../../MovieCard/MovieCard";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  getAppStateError,
  getAppStateMoviesFavorites,
} from "../../../storage/selectors";
import ActionCreators from "../../../storage/reducers/appReducer/actionCreators";
import cl from "./Favorites.module.css";
import AlertComponent from "../../Alert/Alert";
import Brand from "../../Brand/Brand";
import {
  IApiResponseFailure,
  IMovieDetail,
  TAppAction,
  TMoviesFavoritesData,
} from "../../../storage/reducers/appReducer/models";
import { fetchDetail } from "../../../services/api";
import NavbarComponent from "../../Navbar/Navbar";

const Favorites: React.FC = () => {
  const moviesFavorites = useAppSelector(getAppStateMoviesFavorites);
  const dispatch = useAppDispatch();
  const error = useAppSelector(getAppStateError);
  const [moviesFavoritesData, setMoviesFavoritesData] = useState<
    TMoviesFavoritesData[]
  >([]);

  useEffect(() => {
    if (moviesFavorites.length === 0) {
      setMoviesFavoritesData((movieData) => []);
    }

    moviesFavorites.forEach(async (movieId) => {
      try {
        dispatch(ActionCreators.SetIsLoadingActionCreator(true) as TAppAction);

        const response: IMovieDetail | IApiResponseFailure | string =
          await fetchDetail(movieId);

        if (typeof response === "string") {
          dispatch(
            ActionCreators.SetErrorActionCreator(response) as TAppAction
          );
          setMoviesFavoritesData((movieData) =>
            moviesFavorites.length >= movieData.length
              ? [...movieData, undefined]
              : [undefined]
          );
        } else {
          if ("success" in response) {
            dispatch(
              ActionCreators.SetErrorActionCreator(
                response.status_message
              ) as TAppAction
            );
            setMoviesFavoritesData((movieData) =>
              moviesFavorites.length >= movieData.length
                ? [...movieData, response]
                : [response]
            );
          } else {
            setMoviesFavoritesData((movieData) =>
              moviesFavorites.length >= movieData.length
                ? [...movieData, response]
                : [response]
            );
            dispatch(
              ActionCreators.SetErrorActionCreator(undefined) as TAppAction
            );
          }
        }

        dispatch(ActionCreators.SetIsLoadingActionCreator(false) as TAppAction);
      } catch (error) {
        let errorMsg;

        if (typeof error === "string") {
          errorMsg = error;
        } else if (error instanceof Error) {
          errorMsg = error.message;
        }

        dispatch(ActionCreators.SetErrorActionCreator(errorMsg) as TAppAction);
        setMoviesFavoritesData((movieData) =>
          moviesFavorites.length >= movieData.length
            ? [...movieData, undefined]
            : [undefined]
        );
        dispatch(ActionCreators.SetIsLoadingActionCreator(false) as TAppAction);
      }
    });
  }, [moviesFavorites]);

  return (
    <>
      <NavbarComponent />
      <div className={cl.container}>
        <div className={cl.headerFavorites}>
          <Brand text="MOVIES FAVORITES" />
        </div>
        {moviesFavoritesData.length > 0 ? (
          <div className={cl.moviesFavorites}>
            {moviesFavoritesData.map((movie) =>
              typeof movie !== "undefined" && !("success" in movie) ? (
                <div style={{ height: "100%", margin: "auto" }} key={movie.id}>
                  <MovieCard
                    imgURL={movie.poster_path}
                    title={movie.title}
                    overview={movie.overview}
                    genresIds={movie.genres.map((genre) => genre.id)}
                    id={movie.id}
                  />
                </div>
              ) : typeof movie === "undefined" ? (
                (error as string)
              ) : (
                movie.status_message
              )
            )}
          </div>
        ) : (
          <div className={cl.errorFavorites}>
            <AlertComponent text={"Here you'll see Your Favorite Movies"} />
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;

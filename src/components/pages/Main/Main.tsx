import React, { useEffect } from "react";
import MovieCard from "../../MovieCard/MovieCard";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  getAppStateError,
  getAppStateMoviesPopular,
  getAppStateMoviesSearch,
} from "../../../storage/selectors";
import ActionCreators from "../../../storage/reducers/appReducer/actionCreators";
import cl from "./Main.module.css";
import AlertComponent from "../../Alert/Alert";
import Brand from "../../Brand/Brand";
import InfiniteScroll from "react-infinite-scroll-component";
import SpinnerComponent from "../../Spinner/Spinner";
import Search from "../../Search/Search";
import NavbarComponent from "../../Navbar/Navbar";

const Main: React.FC = () => {
  const moviesPopular = useAppSelector(getAppStateMoviesPopular);
  const dispatch = useAppDispatch();
  const error = useAppSelector(getAppStateError);
  const moviesSearch = useAppSelector(getAppStateMoviesSearch);

  useEffect(() => {
    dispatch(ActionCreators.fetchPopularThunkCreator(1));
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className={cl.container}>
        <div className={cl.headerSearch}>
          <Search />
        </div>
        {typeof moviesSearch !== "undefined" && "page" in moviesSearch ? (
          moviesSearch.results.length > 0 ? (
            <div className={cl.moviesSearch}>
              {moviesSearch.results.map((movie) => (
                <div style={{ height: "100%", margin: "auto" }} key={movie.id}>
                  <MovieCard
                    imgURL={movie.poster_path}
                    title={movie.title}
                    overview={movie.overview}
                    genresIds={movie.genre_ids}
                    id={movie.id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={cl.errorSearch}>
              <AlertComponent text="No results for Your query" />
            </div>
          )
        ) : (
          <div className={cl.errorSearch}>
            <AlertComponent
              text={
                typeof moviesSearch === "undefined"
                  ? "Here you'll see results of search"
                  : moviesSearch.status_message
              }
            />
          </div>
        )}
        <div className={cl.headerPopular}>
          <Brand text="POPULAR FILMS" />
        </div>
        {typeof moviesPopular !== "undefined" && "page" in moviesPopular ? (
          <InfiniteScroll
            dataLength={moviesPopular.results.length}
            next={() =>
              dispatch(
                ActionCreators.fetchPopularThunkCreator(moviesPopular.page + 1)
              )
            }
            hasMore={moviesPopular.page < moviesPopular.total_pages}
            loader={<SpinnerComponent />}
            className={cl.moviesPopular}
          >
            {moviesPopular.results.map((movie) => (
              <div style={{ height: "100%", margin: "auto" }} key={movie.id}>
                <MovieCard
                  imgURL={movie.poster_path}
                  title={movie.title}
                  overview={movie.overview}
                  genresIds={movie.genre_ids}
                  id={movie.id}
                />
              </div>
            ))}
          </InfiniteScroll>
        ) : (
          <div className={cl.errorPopular}>
            <AlertComponent
              text={
                typeof moviesPopular === "undefined"
                  ? (error as string)
                  : moviesPopular.status_message
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Main;

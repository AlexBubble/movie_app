import React, { useEffect } from "react";
import MovieCardDetail from "../../MovieCardDetail/MovieCardDetail";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  getAppStateError,
  getAppStateMovieTrailer,
  getAppStateMoviesRecommended,
  getAppStateMoviesSimilar,
} from "../../../storage/selectors";
import ActionCreators from "../../../storage/reducers/appReducer/actionCreators";
import cl from "./Detail.module.css";
import AlertComponent from "../../Alert/Alert";
import Brand from "../../Brand/Brand";
import { useParams } from "react-router-dom";
import MovieCard from "../../MovieCard/MovieCard";
import ReactPlayer from "react-player/youtube";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ITrailerDetail } from "../../../storage/reducers/appReducer/models";
import NavbarComponent from "../../Navbar/Navbar";

const Detail: React.FC = () => {
  const moviesSimilar = useAppSelector(getAppStateMoviesSimilar);
  const moviesRecommended = useAppSelector(getAppStateMoviesRecommended);
  const dispatch = useAppDispatch();
  const error = useAppSelector(getAppStateError);
  const trailer = useAppSelector(getAppStateMovieTrailer);

  const { movieId } = useParams();

  useEffect(() => {
    dispatch(
      ActionCreators.fetchRecommendedThunkCreator(1, Number(movieId as string))
    );
    dispatch(
      ActionCreators.fetchSimilarThunkCreator(1, Number(movieId as string))
    );
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className={cl.headerDetail}>
        <Brand text="MOVIE DETAILS" />
      </div>
      <Container fluid>
        <Row>
          <Col>
            <MovieCardDetail />
          </Col>
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {typeof trailer !== "undefined" && !("success" in trailer) ? (
              typeof trailer.results.find(
                (obj) =>
                  obj.site === "YouTube" &&
                  obj.type === "Trailer" &&
                  obj.official
              ) !== "undefined" ? (
                trailer.results.find(
                  (obj) =>
                    obj.site === "YouTube" &&
                    obj.type === "Trailer" &&
                    obj.official
                ) ? (
                  <div className={cl.movieTrailer}>
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${
                        (
                          trailer.results.find(
                            (obj) =>
                              obj.site === "YouTube" &&
                              obj.type === "Trailer" &&
                              obj.official
                          ) as ITrailerDetail
                        ).key
                      }`}
                      controls={true}
                      height="100%"
                    />
                  </div>
                ) : (
                  <div className={cl.errorTrailer}>
                    <AlertComponent text="There's no official trailer on YouTube" />
                  </div>
                )
              ) : (
                <div className={cl.errorTrailer}>
                  <AlertComponent text="There's no official trailer on YouTube" />
                </div>
              )
            ) : (
              <div className={cl.errorTrailer}>
                <AlertComponent
                  text={
                    typeof trailer === "undefined"
                      ? (error as string)
                      : trailer.status_message
                  }
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <div className={cl.headerSimilar}>
        <Brand text="SIMILAR FILMS" />
      </div>
      {typeof moviesSimilar !== "undefined" && "page" in moviesSimilar ? (
        moviesSimilar.results.length > 0 ? (
          <div className={cl.moviesSimilar}>
            {moviesSimilar.results.map((movie) => (
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
          <div className={cl.errorSimilar}>
            <AlertComponent text="No similar films" />
          </div>
        )
      ) : (
        <div className={cl.errorSimilar}>
          <AlertComponent
            text={
              typeof moviesSimilar === "undefined"
                ? (error as string)
                : moviesSimilar.status_message
            }
          />
        </div>
      )}
      <div className={cl.headerRecommended}>
        <Brand text="RECOMMENDED FILMS" />
      </div>
      {typeof moviesRecommended !== "undefined" &&
      "page" in moviesRecommended ? (
        moviesRecommended.results.length > 0 ? (
          <div className={cl.moviesRecommended}>
            {moviesRecommended.results.map((movie) => (
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
          <div className={cl.errorRecommended}>
            <AlertComponent text="No recommended films" />
          </div>
        )
      ) : (
        <div className={cl.errorRecommended}>
          <AlertComponent
            text={
              typeof moviesRecommended === "undefined"
                ? (error as string)
                : moviesRecommended.status_message
            }
          />
        </div>
      )}
    </>
  );
};

export default Detail;

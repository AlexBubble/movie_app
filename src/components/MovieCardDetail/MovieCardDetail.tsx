import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  getAppStateError,
  getAppStateMovieDetail,
  getAppStateMoviesFavorites,
} from "../../storage/selectors";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import ActionCreators from "../../storage/reducers/appReducer/actionCreators";
import ProgressBar from "react-bootstrap/ProgressBar";
import StarRatings from "react-star-ratings";
import cl from "./MovieCardDetail.module.css";
import AlertComponent from "../Alert/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Badge } from "react-bootstrap";

const MovieCardDetail: React.FC = () => {
  const movieDetail = useAppSelector(getAppStateMovieDetail);
  const dispatch = useAppDispatch();
  const error = useAppSelector(getAppStateError);
  const favorites = useAppSelector(getAppStateMoviesFavorites);

  const { movieId } = useParams();

  useEffect(() => {
    dispatch(ActionCreators.fetchDetailThunkCreator(Number(movieId as string)));
    dispatch(
      ActionCreators.fetchTrailerThunkCreator(Number(movieId as string))
    );
  }, []);

  const buttonClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (
      typeof favorites.find((movie) => movie === Number(movieId as string)) ===
      "undefined"
    ) {
      dispatch(
        ActionCreators.SetMovieFavoriteActionCreator(Number(movieId as string))
      );
    } else {
      dispatch(
        ActionCreators.DeleteMovieFavoriteActionCreator(
          Number(movieId as string)
        )
      );
    }
  };

  return typeof movieDetail !== "undefined" && !("success" in movieDetail) ? (
    <Container fluid>
      <Row>
        <Col style={{ paddingRight: "0" }}>
          <Card
            style={{ width: "18rem", height: "100%", marginLeft: "auto" }}
            bg="dark"
            border="success"
            text="white"
            className={cl.movieDetail}
          >
            <Card.Img
              variant="top"
              src={
                movieDetail.poster_path
                  ? (process.env.REACT_APP_IMAGE_PATH as string) +
                    movieDetail.poster_path
                  : "no_image_available.png"
              }
            />
            <Card.Body>
              <Card.Title>
                {movieDetail.title ? movieDetail?.title : "No title"}
              </Card.Title>
              <Card.Subtitle className="mb-2">
                Genres:
                {movieDetail.genres.length > 0
                  ? " " +
                    movieDetail.genres.map((genre) => genre.name).join(", ")
                  : ""}
              </Card.Subtitle>
              <Card.Text>
                {movieDetail.overview
                  ? movieDetail.overview.length >= 98
                    ? movieDetail.overview.slice(0, 98) + "..."
                    : movieDetail.overview
                  : "No overview"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col style={{ paddingLeft: "0" }}>
          <Card
            style={{ width: "18rem", height: "100%" }}
            bg="dark"
            border="success"
            text="white"
            className={cl.movieDetail}
          >
            <ListGroup className="list-group-flush">
              <ListGroup.Item variant="dark">
                Budget: {movieDetail.budget ? movieDetail.budget : "Unknown"}
              </ListGroup.Item>
              <ListGroup.Item variant="dark">
                Popularity:{" "}
                <ProgressBar
                  striped
                  variant="info"
                  now={
                    movieDetail.popularity ? movieDetail.popularity : undefined
                  }
                  label={
                    movieDetail.popularity ? `${movieDetail.popularity}` : ""
                  }
                />
              </ListGroup.Item>
              <ListGroup.Item variant="dark">
                Countries:
                {movieDetail.production_countries.length > 0
                  ? " " +
                    movieDetail.production_countries
                      .map((country) => country.name)
                      .join(", ")
                  : ""}
              </ListGroup.Item>
              <ListGroup.Item variant="dark">
                Release date:{" "}
                {movieDetail.release_date
                  ? movieDetail.release_date
                  : "Unknown"}
              </ListGroup.Item>
              <ListGroup.Item variant="dark">
                Revenue:{" "}
                {movieDetail.revenue ? movieDetail.revenue + " $" : "Unknown"}
              </ListGroup.Item>
              <ListGroup.Item variant="dark">
                Runtime:{" "}
                {movieDetail.runtime
                  ? movieDetail.runtime + " mins"
                  : "Unknown"}
              </ListGroup.Item>
              <ListGroup.Item variant="dark">
                Status: {movieDetail.status ? movieDetail.status : "Unknown"}
              </ListGroup.Item>
              <ListGroup.Item variant="dark">
                Tag: {movieDetail.tagline ? movieDetail.tagline : "Unknown"}
              </ListGroup.Item>
              <ListGroup.Item variant="dark">
                Vote average:{" "}
                {movieDetail.vote_average ? (
                  <StarRatings
                    rating={Number(movieDetail.vote_average)}
                    starRatedColor="orange"
                    numberOfStars={10}
                    name="rating"
                    starDimension="15px"
                    starSpacing="3px"
                  />
                ) : (
                  "Unknown"
                )}
              </ListGroup.Item>
              <ListGroup.Item variant="dark">
                Vote count:{" "}
                {movieDetail.vote_count ? movieDetail.vote_count : "Unknown"}
              </ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button variant="primary" onClick={buttonClickHandler}>
                {typeof favorites.find(
                  (movie) => movie === Number(movieId as string)
                ) === "undefined"
                  ? "Add to Favorites"
                  : "Delete from Favorites"}
              </Button>
              {typeof favorites.find(
                (movie) => movie === Number(movieId as string)
              ) === "undefined" ? (
                ""
              ) : (
                <Badge
                  pill
                  bg="warning"
                  text="dark"
                  style={{ marginTop: "10px" }}
                >
                  In Favorites
                </Badge>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <div className={cl.errorDetail}>
      <AlertComponent
        text={
          typeof movieDetail === "undefined"
            ? (error as string)
            : movieDetail.status_message
        }
      />
    </div>
  );
};

export default MovieCardDetail;

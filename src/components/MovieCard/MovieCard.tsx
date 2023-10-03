import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  getAppStateGenres,
  getAppStateMoviesFavorites,
} from "../../storage/selectors";
import { IGenre } from "../../storage/reducers/appReducer/models";
import { useNavigate } from "react-router-dom";
import cl from "./MovieCard.module.css";
import ActionCreators from "../../storage/reducers/appReducer/actionCreators";
import Badge from "react-bootstrap/Badge";

interface IMovieCardProps {
  imgURL: string;
  title: string;
  overview: string;
  genresIds: number[];
  id: number;
}

const MovieCard: React.FC<IMovieCardProps> = ({
  imgURL,
  title,
  overview,
  genresIds,
  id,
}) => {
  const genres = useAppSelector(getAppStateGenres);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getAppStateMoviesFavorites);

  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/detail/${id}`);
  };

  const buttonClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (typeof favorites.find((movieId) => movieId === id) === "undefined") {
      dispatch(ActionCreators.SetMovieFavoriteActionCreator(id));
    } else {
      dispatch(ActionCreators.DeleteMovieFavoriteActionCreator(id));
    }
  };

  return (
    <Card
      style={{ width: "18rem", height: "100%" }}
      bg="dark"
      border="success"
      text="white"
      onClick={clickHandler}
      className={cl.movieCard}
    >
      <Card.Img
        variant="top"
        src={
          imgURL
            ? (process.env.REACT_APP_IMAGE_PATH as string) + imgURL
            : "no_image_available.png"
        }
        style={{ height: "350px" }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2">
          Genres:
          {typeof genres !== "undefined" && !("success" in genres)
            ? " " +
              genresIds
                .map(
                  (genreId) =>
                    (genres.find((genre) => genre.id === genreId) as IGenre)
                      .name
                )
                .join(", ")
            : ""}
        </Card.Subtitle>
        <Card.Text>
          {overview
            ? overview.length >= 98
              ? overview.slice(0, 98) + "..."
              : overview
            : "No overview"}
        </Card.Text>
        <Button variant="primary" onClick={buttonClickHandler}>
          {typeof favorites.find((movieId) => movieId === id) === "undefined"
            ? "Add to Favorites"
            : "Delete from Favorites"}
        </Button>
        {typeof favorites.find((movieId) => movieId === id) === "undefined" ? (
          ""
        ) : (
          <Badge pill bg="warning" text="dark" style={{ marginTop: "10px" }}>
            In Favorites
          </Badge>
        )}
      </Card.Body>
    </Card>
  );
};

export default MovieCard;

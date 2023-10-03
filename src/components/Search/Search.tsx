import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import InputGroup from "react-bootstrap/InputGroup";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getAppStateQuery } from "../../storage/selectors";
import ActionCreators from "../../storage/reducers/appReducer/actionCreators";

const Search = () => {
  const query = useAppSelector(getAppStateQuery);
  const dispatch = useAppDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      dispatch(ActionCreators.SetQueryActionCreator(event.target.value));
      dispatch(ActionCreators.fetchSearchThunkCreator(1, event.target.value));
    } else {
      dispatch(ActionCreators.SetQueryActionCreator(undefined));
      dispatch(ActionCreators.SetMoviesSearchActionCreator(undefined));
    }
  };

  return (
    <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand>SEARCH FILMS</Navbar.Brand>
        <Form className="d-flex">
          <InputGroup>
            <InputGroup.Text id="basic-addon1">&#128269;</InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              aria-describedby="basic-addon1"
              value={query || ""}
              onChange={changeHandler}
            />
          </InputGroup>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Search;

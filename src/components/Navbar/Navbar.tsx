import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    switch ((e.target as HTMLElement).innerText) {
      case "Home":
        navigate("/");

        break;
      case "Favorites":
        navigate("/favorites");

        break;
      default:
        return;
    }
  };

  return (
    <Navbar
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
      style={{ marginBottom: "10px" }}
    >
      <Container fluid>
        <Navbar.Brand>NAVIGATION</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={clickHandler}>Home</Nav.Link>
          <Nav.Link onClick={clickHandler}>Favorites</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

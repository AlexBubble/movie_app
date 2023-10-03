import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

interface IBrandProps {
  text: string;
}

const Brand: React.FC<IBrandProps> = ({ text }) => {
  return (
    <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand>{text}</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Brand;

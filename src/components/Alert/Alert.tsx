import Alert from "react-bootstrap/Alert";

interface IAlertComponentProps {
  text: string;
}

const AlertComponent: React.FC<IAlertComponentProps> = ({ text }) => {
  return <Alert variant="info">{text}</Alert>;
};

export default AlertComponent;

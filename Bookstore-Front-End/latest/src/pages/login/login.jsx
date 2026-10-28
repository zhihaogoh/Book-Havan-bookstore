import { Col, Row } from "react-bootstrap";
import FormLogin from "../../components/login/form_login";

export default function Login() {
  return (
    <>
      <>
        <div className="container p-5">
          <Row>
            <Col md={12} lg={12}>
              <div className="title py-2 text-center">
                <h3>Havan Bookstore</h3>
                <p>Welcome back. Please enter your details.</p>
              </div>
              <FormLogin />
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}

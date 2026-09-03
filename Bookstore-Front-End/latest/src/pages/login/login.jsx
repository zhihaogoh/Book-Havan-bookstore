import { Col, Row } from "react-bootstrap";
import Layout from "../../layout/Layout";
import FormLogin from "../../components/login/form_login";

export default function Login() {
  return (
    <>
      <Layout>
        <div className="container p-3">
          <Row>
            <Col md={6} lg={6}>
              <div className="title py-2 text-center">
                <h3>Havan Bookstore</h3>
                <p>Welcome back. Please enter your details.</p>
              </div>
              <FormLogin />
            </Col>
            <Col md={6} lg={6} className="d-none d-md-block">
              <img className="login_img"
                src="../src/assets/image/About/About-Title-Background.jpg"
                alt="../src/assets/image/About/About-Title-Background.jpg"
              />
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  );
}

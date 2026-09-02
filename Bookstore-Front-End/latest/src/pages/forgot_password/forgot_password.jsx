import { Col, Row } from "react-bootstrap";
import Layout from "../../layout/Layout";
import ForgotPasswordForm from "../../components/forgot_password_form/forgot_password_form";

export default function ForgotPassword() {
  return (
    <>
      <Layout>
        <div className="container p-3">
          <Row>
            <Col md={6} lg={6}>
              <div className="title">
                <h3>Forgot Password</h3>
                <p>Enter your email and we&apos; ll send you a link to reset your password.</p>
              </div>
              <ForgotPasswordForm />
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
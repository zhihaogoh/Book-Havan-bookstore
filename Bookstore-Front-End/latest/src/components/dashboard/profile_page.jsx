import { Col, Row } from "react-bootstrap";

export default function ProfilePage() {
  return (
    <>
      <div className="profile_information">
        <div className="title">
          <h3>Profile Information</h3>
          <span>Edit</span>
        </div>
        <div className="profile">
          <Row className="py-3">
            <Col md={6} lg={6}>
              <div className="information">
                <span className="mb-3">First Name</span>
                <span>g</span>
              </div>
            </Col>
            <Col md={6} lg={6}>
              <div className="information">
                <span className="mb-3">Last Name</span>
                <span>z</span>
              </div>
            </Col>
          </Row>
          <Row className="py-3">
            <Col md={6} lg={6}>
              <div className="information">
                <span className="mb-3">Phone Number</span>
                <span>012-34567890</span>
              </div>
            </Col>
            <Col md={6} lg={6}>
              <div className="information">
                <span className="mb-3">Gender</span>
                <span>Male</span>
              </div>
            </Col>
          </Row>
          <Row className="py-3">
            <Col md={12} lg={12}>
              <div className="information">
                <span className="mb-3">Email</span>
                <span>name@example.com</span>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

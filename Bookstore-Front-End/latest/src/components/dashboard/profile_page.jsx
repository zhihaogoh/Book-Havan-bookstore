import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function ProfilePage({
  first_name,
  last_name,
  gender,
  phone_number,
  email
}) {
  const navigate= useNavigate();
  const toEditProfile = () =>{
    navigate("/edit_profile")
  }
  return (
    <>
      <div className="profile_information">
        <div className="title">
          <h3>Profile Information</h3>
          <span onClick={toEditProfile}>Edit</span>
        </div>
        <div className="profile">
          <Row className="py-3">
            <Col md={6} lg={6} xs={6}>
              <div className="information">
                <span className="mb-3">First Name</span>
                <span>{first_name ?? "Not Found"}</span>
              </div>
            </Col>
            <Col md={6} lg={6} xs={6}>
              <div className="information">
                <span className="mb-3">Last Name</span>
                <span>{last_name ?? "Not Found"}</span>
              </div>
            </Col>
          </Row>
          <Row className="py-3">
            <Col md={6} lg={6}  xs={6}>
              <div className="information">
                <span className="mb-3">Phone Number</span>
                <span>{phone_number ?? "Not Found"}</span>
              </div>
            </Col>
            <Col md={6} lg={6}  xs={6}>
              <div className="information">
                <span className="mb-3">Gender</span>
                <span>{gender ?? "Not Found"}</span>
              </div>
            </Col>
          </Row>
          <Row className="py-3">
            <Col md={12} lg={12}  xs={12}>
              <div className="information">
                <span className="mb-3">Email</span>
                <span>{email}</span>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

ProfilePage.propTypes ={
   first_name : PropTypes.string.isRequired,
   last_name : PropTypes.string.isRequired,
   gender : PropTypes.string.isRequired,
   phone_number : PropTypes.string.isRequired,
   email : PropTypes.string.isRequired
}

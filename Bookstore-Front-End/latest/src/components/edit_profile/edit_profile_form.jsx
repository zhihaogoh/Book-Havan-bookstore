import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { FiSave } from "react-icons/fi";
import { MdContactMail, MdInfo } from "react-icons/md";
import { useNavigate } from "react-router";

export default function EditProfileForm({ fields_basic, fields_contact }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    contact_number: "",
    email: "",
    gender: "",
    IC_Passport: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
  function handleEditProfile(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!data.first_name) {
      nextErrors.first_name = "Please enter your first name";
    }
    if (!data.last_name) {
      nextErrors.last_name = "Please enter your last name";
    }
    if (!data.IC_Passport.trim()) {
      nextErrors.IC_Passport = "Please enter your IC or Passport";
    } else if (!/^[A-Za-z0-9]+$/.test(data.IC_Passport.trim())) {
      nextErrors.IC_Passport = "Only letters and numbers are allowed";
    }
    if (!data.gender) {
      nextErrors.gender = "Please select your gender";
    }
    if (!data.date_of_birth) {
      nextErrors.date_of_brith = "Please select your date or birth";
    }
    if (!data.contact_number.trim()) {
      nextErrors.contact_number = "Please sleect your contact number";
    } else if (!/^\+[1-9]\d{0,2}-\d{6,12}$/.test(data.contact_number.trim())) {
      nextErrors.contact_number = "Use the format +60-123456789";
    }
    if (!data.email.trim()) {
      nextErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      nextErrors.email = "Please enter a valid email, e.g. name@gmail.com";
    }
    // 更新字段错误，用于显示红框和对应的 message
    setError(nextErrors);

    // 存在输入错误，立即停止，不调用接口
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    try {
      setMessage(
        "Form validated. The server is not connected. Your password has not been changed.",
      );
    } catch {
      setMessage("Unable to change your password. Please try again.");
    }
  }
  return (
    <>
      {message && (
        <p className="password-message" role="status">
          {message}
        </p>
      )}
      <div className="edit_profile">
        <div className="title">
          <h3>Edit Profile</h3>
          <span>
            Update your personal details and contact information to curate your
            bespoke catalog recommendations.
          </span>
        </div>
        <Form className="information_profile" onSubmit={handleEditProfile}>
          <Card className="information my-3">
            <Row className="header_information px-0 pb-3">
              <Col md={10} lg={10}>
                <div className="title_information">
                  <MdInfo className="icon" />
                  <div className="title">
                    <h3>Basic Information</h3>
                    <span>
                      Your primary identity and reading community presence
                    </span>
                  </div>
                </div>
              </Col>
              <Col className="d-none d-md-block" md={2} lg={2}>
                <div className="section">
                  <span>Section 1</span>
                </div>
              </Col>
            </Row>

            <Row>
              {fields_basic.map((item, index) => (
                <Fragment key={index}>
                  <Col md={6}>
                    <Form.Group
                      className="group_input px-3 py-2"
                      controlId={`form-${item.name}`}
                    >
                      {item.type === "select" ? (
                        <>
                          <Form.Label>{item.label}</Form.Label>
                          <Form.Select
                            name={item.name}
                            value={data[item.name] ?? ""}
                            onChange={(event) => {
                              const value = event.target.value;
                              setData((prev) => ({
                                ...prev,
                                [item.name]: value,
                              }));
                              setError((prev) => ({
                                ...prev,
                                [item.name]: "",
                              }));
                            }}
                          >
                            {item.option.map((option) => (
                              <option key={option.id} value={option.value}>
                                {option.gender}
                              </option>
                            ))}
                          </Form.Select>
                        </>
                      ) : (
                        <>
                          <Form.Label>{item.label}</Form.Label>
                          <Form.Control
                            type={item.type}
                            name={item.name}
                            placeholder={item.placeholder}
                            value={data[item.name] ?? ""}
                            onChange={(event) => {
                              const value = event.target.value;
                              setData((prev) => ({
                                ...prev,
                                [item.name]: value,
                              }));
                              setError((prev) => ({
                                ...prev,
                                [item.name]: "",
                              }));
                            }}
                          />
                        </>
                      )}
                    </Form.Group>
                    {error[item.name] && (
                      <Form.Control.Feedback
                        type="invalid"
                        className="d-block ps-3"
                        id={`error-${item.name}`}
                        role="alert"
                      >
                        {error[item.name]}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Fragment>
              ))}
            </Row>
          </Card>
          <Card className="information my-3">
            <Row className="header_information px-0 pb-3">
              <Col md={10} lg={10}>
                <div className="title_information">
                  <MdContactMail className="icon" />
                  <div className="title">
                    <h3> Contact Information</h3>
                    <span>
                      Delivery notices, dispatch alerts, and correspondence
                    </span>
                  </div>
                </div>
              </Col>
              <Col className="d-none d-md-block" md={2} lg={2}>
                <div className="section">
                  <span>Section 2</span>
                </div>
              </Col>
            </Row>
            <Row>
              {fields_contact.map((item, index) => (
                <Fragment key={index}>
                  <Col md={6}>
                    <Form.Group
                      className="group_input px-3 py-2"
                      controlId={`form-${item.name}`}
                    >
                      <Form.Label>{item.label}</Form.Label>
                      <Form.Control
                        type={item.type}
                        name={item.name}
                        placeholder={item.placeholder}
                        value={data[item.name] ?? ""}
                        onChange={(event) => {
                          const value = event.target.value;
                          setData((prev) => ({
                            ...prev,
                            [item.name]: value,
                          }));
                          setError((prev) => ({
                            ...prev,
                            [item.name]: "",
                          }));
                        }}
                      />
                    </Form.Group>
                    {error[item.name] && (
                      <Form.Control.Feedback
                        type="invalid"
                        className="d-block ps-3"
                        id={`error-${item.name}`}
                        role="alert"
                      >
                        {error[item.name]}
                      </Form.Control.Feedback>
                    )}
                  </Col>
                </Fragment>
              ))}
            </Row>
          </Card>
          <Card className="product_action my-3">
            <span>
              All required reader details have been verified and are ready to
              save.
            </span>
            <Button
              type="button"
              className="edit_cancel"
              onClick={() => navigate("/profile")}
            >
              Discard Changes
            </Button>
            <Button type="submit" className="submit">
              <FiSave aria-hidden="true" />
              Save Changes
            </Button>
          </Card>
        </Form>
      </div>
    </>
  );
}

EditProfileForm.propTypes = {
  fields_basic: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      option: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          gender: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
  fields_contact: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }),
  ),
};

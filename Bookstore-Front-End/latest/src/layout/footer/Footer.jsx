import PropTypes from "prop-types";
import { Row, Col, ListGroup, ListGroupItem, Form } from "react-bootstrap";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
export default function Footer({ company, company_important, contact }) {
  return (
    <>
      <div className="footer">
        <div className="container">
          <Row>
            <Col xs={12} md={6} lg={3} className="text-start">
              <ListGroup className="bg-transparent text-body">
                <ListGroup.Item>
                  <h5 className="text-dark">{company}</h5>
                </ListGroup.Item>
                {company_important.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <a
                      href={item.link}
                      className="text-dark link-underline-light f-menu"
                    >
                      {item.title}
                    </a>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col xs={12} md={6} lg={3} className="text-start">
              <ListGroup>
                <ListGroup.Item>
                  <h5 className="text-dark">Customer Service</h5>
                </ListGroup.Item>
                {contact.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <a
                      href={item.link}
                      className="text-dark link-underline-light f-menu"
                    >
                      {item.title}
                    </a>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col xs={12} md={6} lg={2} className="text-start">
              <ListGroup>
                <div className="d-flex flex-column justify-content-start">
                  <ListGroup.Item className="pe-0">
                    <h5 className="text-dark">Social Media</h5>
                  </ListGroup.Item>
                  <div className="d-flex flex-row">
                    <ListGroup.Item>
                      <FaFacebook className="facebook f-menu" />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <PiInstagramLogoFill className="instagram f-menu" />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FaTiktok className="tiktok f-menu" />
                    </ListGroup.Item>
                  </div>
                </div>
              </ListGroup>
            </Col>
            <Col xs={12} md={6} lg={4} className="text-start">
              <ListGroup>
                <div className="d-flex flex-column justify-content-start">
                  <ListGroup.Item>
                    <h5 className="text-dark">Subscribe to newsletter</h5>
                  </ListGroup.Item>
                  <ListGroupItem>
                    <Form className="d-block email">
                      <Form.Control
                        type="email"
                        placeholder="Please enter youtr email"
                        className="me-2"
                        aria-label="email"
                        id="email-input"
                      ></Form.Control>
                      <button type="submit" className="subscrible">
                        Subscrible
                      </button>
                    </Form>
                  </ListGroupItem>
                </div>
              </ListGroup>
            </Col>
          </Row>
          <div className="copyright_footer">
            <Row className="align-items-center justify-content-center">
              <Col className="text-center">
                <p className="text-muted">
                  &copy; 2026 NOVEL-BOOKSTORE. All rights reserved.
                </p>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

Footer.propTypes = {
  company: PropTypes.string.isRequired,
  company_important: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  contact: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};

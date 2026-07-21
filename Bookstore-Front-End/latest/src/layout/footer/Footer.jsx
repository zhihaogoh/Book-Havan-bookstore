import { Row, Col, ListGroup, ListGroupItem, Form } from 'react-bootstrap';
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
export default function Footer() {
    return (
        <>
            <div className='footer'>
                <div className="container">
                    <Row>
                        <Col xs={12} md={6} lg={3} className="text-start">
                            <ListGroup className="bg-transparent text-body">
                                <ListGroup.Item>
                                    <h5 className="text-dark">Novel-bookstore Online</h5>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a href="#" className="text-dark link-underline-light f-menu">
                                        About
                                    </a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a href="#" className="text-dark link-underline-light f-menu">
                                        Term
                                    </a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a href="#" className="text-dark link-underline-light f-menu">
                                        Privacy policy
                                    </a>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col xs={12} md={6} lg={3} className="text-start">
                            <ListGroup>
                                <ListGroup.Item>
                                    <h5 className="text-dark">Customer Service</h5>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a href="#" className="text-dark link-underline-light f-menu">
                                        FAQ
                                    </a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a href="#" className="text-dark link-underline-light f-menu">
                                        Contact us
                                    </a>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <a href="#" className="text-dark link-underline-light f-menu">
                                        Delivery service
                                    </a>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col xs={12} md={6} lg={2} className="text-start">
                            <ListGroup>
                                <div className="d-flex flex-column justify-content-start">
                                    <ListGroup.Item className='pe-0'>
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
                                    <ListGroup.Item >
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
                                            >

                                            </Form.Control>
                                            <button type="submit" className='subscrible'>Subscrible</button>
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
                                    &copy; 2025 NOVEL-BOOKSTORE. All rights reserved.
                                </p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>

    )
    
}
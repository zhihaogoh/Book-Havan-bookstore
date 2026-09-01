import { Accordion, Form, Row } from "react-bootstrap";

export default function FormPayment() {
  return (
    <>
      <Form className="form_payment">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Credit Card</Accordion.Header>
            <Accordion.Body>
              <Row>
                <Form.Group className="mb-3 col-md-12" controlId="formBasicEmail">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter card number" />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3 col-md-6" controlId="formBasicEmail">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control type="text" placeholder="MM/YY" />
                </Form.Group>
                <Form.Group className="mb-3 col-md-6" controlId="formBasicEmail">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control type="text" placeholder="Enter CVV" />
                </Form.Group>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>PayPal</Accordion.Header>
            <Accordion.Body>
              <p>Pay with your PayPal account.</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Form>
    </>
  );
}

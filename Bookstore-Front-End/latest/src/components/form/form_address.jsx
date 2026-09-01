import { Form, Row } from "react-bootstrap";

export default function FormAddress() {
    return(
        <>
        <Form className="form_address">
          <Row>
            <Form.Group className="mb-3 col-md-6" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
            </Form.Group>
            <Form.Group className="mb-3 col-md-6" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3 col-md-12" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter address" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3 col-md-12" controlId="formBasicEmail">
              <Form.Label>Address Line 2 (Optional)</Form.Label>
              <Form.Control type="text" placeholder="Enter address line 2" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3 col-md-4" controlId="formBasicEmail">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter city" />
            </Form.Group>
            <Form.Group className="mb-3 col-md-4" controlId="formBasicEmail">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="Enter state" />
            </Form.Group>
            <Form.Group className="mb-3 col-md-4" controlId="formBasicEmail">
              <Form.Label>Zip/Postal Code</Form.Label>
              <Form.Control type="text" placeholder="Enter zip code" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3 col-md-12" controlId="formBasicEmail">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder="Enter country" />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Save this information for next time"
            />
          </Form.Group>
        </Form>
        </>
    )
}
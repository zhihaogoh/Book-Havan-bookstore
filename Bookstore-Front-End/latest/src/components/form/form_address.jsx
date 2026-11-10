import PropTypes from "prop-types";
import { Form, Row } from "react-bootstrap";
import { Link } from "react-router";

export default function FormAddress({ address }) {
  return (
    <>
      <Form className="form_address">
        <Row>
          <Form.Group className="mb-3 col-md-12" controlId="formBasicEmail">
            <Form.Label>Reciptment Name</Form.Label>
            <Form.Control
              type="text"
              value={address.recipient_name}
              placeholder="Enter reciptment name"
              disabled
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3 col-md-12" controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={address.address_1}
              placeholder="Enter address"
              disabled
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3 col-md-12" controlId="formBasicEmail">
            <Form.Label>Address Line 2 (Optional)</Form.Label>
            <Form.Control
              type="text"
              value={address.address_2}
              placeholder="Enter address line 2"
              disabled
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3 col-md-4" controlId="formBasicEmail">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={address.city}
              placeholder="Enter city"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-4" controlId="formBasicEmail">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              value={address.state}
              placeholder="Enter state"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-4" controlId="formBasicEmail">
            <Form.Label>Zip/Postal Code</Form.Label>
            <Form.Control
              type="text"
              value={address.postal_code}
              placeholder="Enter zip code"
              disabled
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3 col-md-12" controlId="formBasicEmail">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              value={address.country}
              placeholder="Enter country"
              disabled
            />
          </Form.Group>
        </Row>
        <Form.Group
          className="mb-3 d-flex justify-content-between"
          controlId="formBasicCheckbox"
        >
          <Link to="/address" className="text-success">
            Change Address
          </Link>
        </Form.Group>
      </Form>
    </>
  );
}
FormAddress.propTypes = {
  address: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      recipient_name: PropTypes.string,
      recipent_phone: PropTypes.string.isRequired,
      address_1: PropTypes.string.isRequired,
      address_2: PropTypes.string,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      postal_code: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      status: PropTypes.bool,
    }),
  ),
};

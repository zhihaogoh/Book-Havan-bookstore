import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";
import FormAddress from "../form/form_address";
import { useNavigate } from "react-router";

export default function AddressForm({ setStep }) {
  const navigate = useNavigate();
  const handleBackToShoppingCart = () => {
    navigate("/shopping_cart");
  }
  return (
    <>
      <div className="address_form">
        <div className="title">
          <h3>Shipping Information</h3>
        </div>
        <FormAddress />
      </div>
      <div className="btn_group">
        <Row>
          <Col lg={6}>
            <Button className="btn-light"
             onClick={handleBackToShoppingCart}
            >Back to Shopping Cart</Button>
          </Col>
          <Col lg={6} className="text-end">
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                setStep(2);
              }}
            >
              Continue to Payment
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

AddressForm.propTypes = {
  setStep: PropTypes.func.isRequired,
};

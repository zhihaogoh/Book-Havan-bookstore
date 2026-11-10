import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";
import FormAddress from "../form/form_address";
import { useNavigate } from "react-router";

export default function AddressForm({ address, setStep }) {
  const navigate = useNavigate();
  const handleBackToShoppingCart = () => {
    navigate("/shopping_cart");
  };
  return (
    <>
      <div className="check_out_form">
        <div className="title">
          <h3>Shipping Information</h3>
        </div>
        <FormAddress
          address={address}
        />
      </div>
      <div className="btn_group">
        <Row>
          <Col md={12} lg={6}>
            <Button className="btn-light " onClick={handleBackToShoppingCart}>
              Back to Shopping Cart
            </Button>
          </Col>
          <Col md={12} lg={6} className="text-end pt-3">
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

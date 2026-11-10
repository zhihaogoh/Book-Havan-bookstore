import PropTypes from "prop-types";
import FormReview from "../form/form_review";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function ReviewForm({ setStep, carts, address }) {
  const navigate = useNavigate();
  const handleBackToHome = async () => {
    try {
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="check_out_form">
        <div className="title">
          <h3>Review Information</h3>
        </div>
        <FormReview carts={carts} address={address} />
      </div>
      <div className="btn_group">
        <Row>
          <Col md={12} lg={6}>
            <Button
              className="btn-light "
              onClick={() => {
                setStep(2);
              }}
            >
              Back to Shopping Cart
            </Button>
          </Col>
          <Col md={12} lg={6} className="text-end pt-3">
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                handleBackToHome();
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

ReviewForm.propTypes = {
  setStep: PropTypes.func.isRequired,
  carts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      book: PropTypes.shape({
        id: PropTypes.number.isRequired,
        book_name: PropTypes.string.isRequired,
        book_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        discount_percentage: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
        book_quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        book_isbn: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
      }),
    }),
  ).isRequired,
  address: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      recipient_name: PropTypes.string,
      recipent_phone: PropTypes.string.isRequired,
      address_1: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      postal_code: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      status: PropTypes.bool,
    }),
  ),
};

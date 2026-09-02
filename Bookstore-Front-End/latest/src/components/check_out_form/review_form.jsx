import PropTypes from "prop-types";
import FormReview from "../form/form_review";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function ReviewForm({ setStep, carts }) {
    const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  }
  return (
    <>
      <div className="check_out_form">
        <div className="title">
          <h3>Review Information</h3>
        </div>
        <FormReview carts={carts} />
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
      BookName: PropTypes.string.isRequired,
      Author: PropTypes.string.isRequired,
      Price: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ),
};

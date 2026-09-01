import { Button, Col, Row } from "react-bootstrap";
import FormPayment from "../form/form_payment";
import PropTypes from "prop-types";

export default function PaymentForm({setStep}){

    return(
        <>
        <div className="check_out_form">
            <div className="title">
                <h3>Payment Information</h3>
            </div>
            <FormPayment />
                  <div className="btn_group">
        <Row>
          <Col md={12} lg={6}>
            <Button className="btn-light "
             onClick={() => {
                setStep(1);
              }}
            >Back to Shopping Cart</Button>
          </Col>
          <Col md={12} lg={6} className="text-end pt-3">
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                setStep(3);
              }}
            >
              Continue to Payment
            </Button>
          </Col>
        </Row>
      </div>
      </div>
        </>
    )
}

PaymentForm.propTypes = {
  setStep: PropTypes.func.isRequired,
};

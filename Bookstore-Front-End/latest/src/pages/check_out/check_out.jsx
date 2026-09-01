import { useState } from "react";
import CheckOutView from "../../components/check_out_form/check_out_view";
import AddressForm from "../../components/check_out_form/address_form";
import ReviewForm from "../../components/check_out_form/review_form";
import PaymentForm from "../../components/check_out_form/payment_form";
import { Col, Row } from "react-bootstrap";
import Layout from "../../layout/Layout";

export default function CheckOut() {
  const [step, setStep] = useState(1);
  return (
    <>
      <Layout>
        <div className="container mb-3">
          <div className="title">
            <h3>Check Out</h3>
            <span>Complete your order securely.</span>
          </div>
          <Row>
            <Col lg={9}>
              <CheckOutView step={step} />
              {step === 1 && (
                <AddressForm step={step} setStep={setStep}
                  onNext={() => {
                    setStep(2);
                  }}
                />
              )}
              {step === 2 && (
                <PaymentForm step={step} setStep={setStep}
                  onNext={() => {
                    setStep(3);
                  }}
                  onBack={() => {
                    setStep(1);
                  }}
                />
              )}
              {step === 3 && (
                <ReviewForm step={step} setStep={setStep}
                  onNext={() => {
                    setStep(4);
                  }}
                  onBack={() => {
                    setStep(2);
                  }}
                />
              )}
            </Col>
            <Col lg={3}></Col>
          </Row>
        </div>
      </Layout>
    </>
  );
}

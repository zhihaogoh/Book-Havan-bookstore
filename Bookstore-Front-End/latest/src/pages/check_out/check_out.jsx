import { useState } from "react";
import CheckOutView from "../../components/check_out_form/check_out_view";
import AddressForm from "../../components/check_out_form/address_form";
import ReviewForm from "../../components/check_out_form/review_form";
import PaymentForm from "../../components/check_out_form/payment_form";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Layout from "../../layout/Layout";
import { cart } from "../../data/products";

export default function CheckOut() {
  const [quantities] = useState(1);
  const shippingFee = 5;
  const getQuantity = (id) => quantities[id] ?? 1;
  const [step, setStep] = useState(1);
  const ShoppingCart = cart;

  const totalItems = cart.reduce(
    (total, item) => total + getQuantity(item.id),
    0,
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.Price * getQuantity(item.id),
    0,
  );

  const total = subtotal + shippingFee;

  return (
    <>
      <Layout>
        <div className="container mb-3">
          <div className="title">
            <h3>Check Out</h3>
            <span>Complete your order securely.</span>
          </div>
          <Row>
            <Col lg={8}>
              <CheckOutView step={step} />
              {step === 1 && (
                <AddressForm
                  step={step}
                  setStep={setStep}
                  onNext={() => {
                    setStep(2);
                  }}
                />
              )}
              {step === 2 && (
                <PaymentForm
                  step={step}
                  setStep={setStep}
                  onNext={() => {
                    setStep(3);
                  }}
                  onBack={() => {
                    setStep(1);
                  }}
                />
              )}
              {step === 3 && (
                <ReviewForm
                  step={step}
                  setStep={setStep}
                  carts={ShoppingCart}
                  onNext={() => {
                    setStep(4);
                  }}
                  onBack={() => {
                    setStep(2);
                  }}
                />
              )}
            </Col>
            <Col lg={4}>
              <Card className="mt-3 p-2 summary_price">
                <div className="title">
                  <h3>Order Summary</h3>
                </div>
                <div className="promo_code">
                  <div className="title">
                    <h3>Promo Code</h3>
                  </div>
                  <Form className="promo_form">
                    <Form.Control type="text" placeholder="Enter Code" />
                    <Button className="btn-light">Apply</Button>
                  </Form>
                </div>
                <div className="calculate_price">
                  <div className="list_price">
                    <span className="detail">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="price">RM{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="list_price">
                    <span className="detail">Estimated Shipping</span>
                    <span className="price">RM{shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="list_price">
                    <span className="detail">Tax</span>
                    <span className="price">Calculated at checkout</span>
                  </div>
                </div>
                <div className="subtotal">
                  <h3 className="detail">Total</h3>
                  <h3 className="price">{total.toFixed(2)}</h3>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  );
}

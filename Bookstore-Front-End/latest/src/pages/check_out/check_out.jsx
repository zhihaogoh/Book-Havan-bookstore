import { useEffect, useState } from "react";
import CheckOutView from "../../components/check_out_form/check_out_view";
import AddressForm from "../../components/check_out_form/address_form";
import ReviewForm from "../../components/check_out_form/review_form";
import PaymentForm from "../../components/check_out_form/payment_form";
import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";

import { getAddress, getCart } from "../../auth/auth";

export default function CheckOut() {
  const quantity = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [carts, setCart] = useState([]);
  const [address, setAddress] = useState([]);
  const shippingFee = 5;
  const tax = 6;
  const getQuantity = (item, currentQuantity = quantity) => {
    const quantity = Number(currentQuantity[item.id] ?? item.quantity);
    return Number.isInteger(quantity) && quantity > 0 ? quantity : 1;
  };
  const [step, setStep] = useState(1);

  const totalItems = carts.reduce(
    (total, item) => total + getQuantity(item),
    0,
  );
  
  const subtotal = carts.reduce((total, item) => {
    const price = Number(item.book?.book_price);
    const discount = Number(item.book?.discount_percentage ?? 0);
    const unitPrice = discount > 0 ? price * (1 - discount / 100) : price;

    return total + unitPrice * getQuantity(item);
  }, 0);
  const sstPrice = (tax / 100) * shippingFee;
  const total = subtotal + sstPrice + shippingFee;

  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await getCart();
        if (!Array.isArray(response.data)) {
          throw new Error("Carts error");
        }
        // console.log(response.data);
        setCart(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    const loadAddress = async () => {
      try {
        const result = await getAddress();
        const addresses = Array.isArray(result?.addresses) ? result.addresses : [];
        const defaultAddress = addresses.find((address) => address.status === true);
        setAddress(defaultAddress ?? null);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadAddress();
    loadCart();
  }, []);
  if (loading) return <Spinner className="center" animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  return (
    <>
      <>
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
                  address = {address}
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
                  carts={carts}
                  address = {address}
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
                    <span className="price">RM {sstPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className="subtotal">
                  <h3 className="detail">Total</h3>
                  <h3 className="price">RM {total.toFixed(2)}</h3>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}

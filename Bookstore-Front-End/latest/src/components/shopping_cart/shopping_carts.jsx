import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { MdDelete, MdFavorite, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router";

export default function ShoppingCarts({ carts }) {
  const [quantities, setQuantities] = useState({});
  const shippingFee = 5;
  const getQuantity = (id) => quantities[id] ?? 1;
  const navigate = useNavigate()

  const updateQuantity = (id, change) => {
    setQuantities((currentQuantities) => ({
      ...currentQuantities,
      [id]: Math.max(1, (currentQuantities[id] ?? 1) + change),
    }));
  };

  const totalItems = carts.reduce(
    (total, item) => total + getQuantity(item.id),
    0,
  );

  const subtotal = carts.reduce(
    (total, item) => total + item.Price * getQuantity(item.id),
    0,
  );

  const total = subtotal + shippingFee;
  const handleProceedToCheckout = () => {
    navigate("/check_out");
  }

  return (
    <>``
      <div className="shopping_cart">
        {carts.length === 0 ? (
          <div className="title">
            <h3>not in your cart</h3>
          </div>
        ) : (
          <>
            <div className="title">
              <h3>Shopping Cart</h3>
              <span>{totalItems} items in your cart.</span>
            </div>
            <div className="list_cart">
              <Row>
                <Col lg={8}>
                  {carts.map((item) => (
                    <Card className="cart" key={item.id}>
                      <Row>
                        <Col md={4} lg={3}>
                          <img src={item.img} alt={item.img} />
                        </Col>
                        <Col md={8} lg={9}>
                          <div className="name_price">
                            <h3>{item.BookName}</h3>
                            <h4>RM{item.Price.toFixed(2)}</h4>
                          </div>
                          <div className="author">
                            <span>{item.Author}</span>
                          </div>
                          <div className="set_product">
                            <Row>
                              <Col xs={5} md={5} lg={4}>
                                <Button className="buttom">
                                  <MdFavorite className="me-1" /> Move to
                                  Wishlist
                                </Button>
                              </Col>
                              <Col xs={3} md={3} lg={4}>
                                <Button className="buttom">
                                  <MdDelete className="me-1" /> Remove
                                </Button>
                              </Col>
                              <Col xs={4} md={4} lg={4}>
                                <div className="h-100 d-flex flex-row justify-content-between align-items-center">
                                  <Button
                                    className="btn-light"
                                    onClick={() => updateQuantity(item.id, -1)}
                                    disabled={getQuantity(item.id) <= 1}
                                  >
                                    -
                                  </Button>
                                  <input
                                    type="number"
                                    className="number"
                                    value={getQuantity(item.id)}
                                    readOnly
                                  />
                                  <Button
                                    className="btn-light"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    +
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </Col>
                <Col lg={4}>
                  <Card className="mt-3 p-3 summary_price">
                    <div className="title">
                      <h3>Order Summary</h3>
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
                        <span className="price">
                          RM{shippingFee.toFixed(2)}
                        </span>
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
                    <div className="promo_code">
                      <div className="title">
                        <h3>Promo Code</h3>
                      </div>
                      <Form className="promo_form">
                        <Form.Control type="text" placeholder="Enter Code" />
                        <Button className="btn-light">Apply</Button>
                      </Form>
                    </div>
                    <div className="check_out py-3">
                      <Button className="btn-light" onClick={handleProceedToCheckout}>
                        Proceed to Check Out <MdKeyboardArrowRight />
                      </Button>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </>
        )}
      </div>
    </>
  );
}

ShoppingCarts.propTypes = {
  carts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      BookName: PropTypes.string.isRequired,
      Author: PropTypes.string.isRequired,
      Price: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
    }),
  ),
};

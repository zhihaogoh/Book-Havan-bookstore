import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { MdDelete, MdFavorite, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router";
import { deleteCart } from "../../auth/auth";
import DeleteStatus from "../Modal/delete_success";

export default function ShoppingCarts({ carts }) {
  const [quantities, setQuantities] = useState({});
  const shippingFee = 5;
  const [modal, setModal] = useState(false);
  const getQuantity = (item, currentQuantities = quantities) => {
    const quantity = Number(currentQuantities[item.id] ?? item.quantity);
    return Number.isInteger(quantity) && quantity > 0 ? quantity : 1;
  };
  const navigate = useNavigate();

  const updateQuantity = (item, change) => {
    setQuantities((currentQuantities) => ({
      ...currentQuantities,
      [item.id]: Math.max(1, getQuantity(item, currentQuantities) + change),
    }));
  };

  const totalItems = carts.reduce(
    (total, item) => total + getQuantity(item),
    0,
  );
  const subtotal = carts.reduce(
    (total, item) => total + Number(item.book?.book_price) * getQuantity(item),
    0,
  );

  const total = subtotal + shippingFee;
  const handleProceedToCheckout = () => {
    navigate("/check_out");
  };
  const handleDelete = async (id) => {
    try {
      const response = deleteCart(id);
      if (response) {
        console.log("Delete Successfully");
        setModal(true);
      }
    } catch (error) {
      console.error("Error deleting address : ", error);
    }
  };
  return (
    <>
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
                          <img
                            src={
                              item.img ??
                              "../src/assets/image/Product/Product1.jpg"
                            }
                            alt={"item.img"}
                          />
                        </Col>
                        <Col md={8} lg={9}>
                          <div className="name_price">
                            <h3>{item.book?.book_name}</h3>
                            <h4>
                              RM
                              {(
                                getQuantity(item) *
                                Number(item.book?.book_price)
                              ).toFixed(2)}
                            </h4>
                          </div>
                          <div className="author">
                            <span>{item.book?.book_author}</span>
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
                                <Button
                                  className="buttom"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  <MdDelete className="me-1" /> Remove
                                </Button>
                              </Col>
                              <Col xs={4} md={4} lg={4}>
                                <div className="h-100 d-flex flex-row justify-content-between align-items-center">
                                  <Button
                                    className="btn-light"
                                    onClick={() => updateQuantity(item, -1)}
                                    disabled={getQuantity(item) <= 1}
                                  >
                                    -
                                  </Button>
                                  <input
                                    type="number"
                                    className="number"
                                    value={getQuantity(item)}
                                    readOnly
                                  />
                                  <Button
                                    className="btn-light"
                                    onClick={() => updateQuantity(item, 1)}
                                    disabled={
                                      getQuantity(item) >=
                                      Number(item.book.book_quantity)
                                    }
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
                      <h3 className="price">RM {total.toFixed(2)}</h3>
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
                      <Button
                        className="btn-success"
                        onClick={handleProceedToCheckout}
                      >
                        Proceed to Check Out <MdKeyboardArrowRight />
                      </Button>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </>
        )}
        <DeleteStatus
          show={modal}
          onHide={() => {
            setModal(false);
          }}
        />
      </div>
    </>
  );
}

ShoppingCarts.propTypes = {
  carts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      book: PropTypes.shape({
        id: PropTypes.number.isRequired,
        book_name: PropTypes.string.isRequired,
        book_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        book_author: PropTypes.string.isRequired,
        book_quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
      }),
      cart: PropTypes.shape({
        user: PropTypes.object,
      }),
    }),
  ).isRequired,
};

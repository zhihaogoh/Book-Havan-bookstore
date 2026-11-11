import PropTypes from "prop-types";
import { useState } from "react";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { MdDelete, MdFavorite, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router";
import { addWishlist, deleteCart, updateCart } from "../../auth/auth";
import DeleteStatus from "../Modal/orderSuccess";

export default function ShoppingCarts({ carts }) {
  const [quantities, setQuantities] = useState({});
  const [updating, setUpdating] = useState({});
  const [quantityError, setQuantityError] = useState("");
  const shippingFee = 5;
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");

  const getQuantity = (item, currentQuantities = quantities) => {
    const quantity = Number(currentQuantities[item.id] ?? item.quantity);
    return Number.isInteger(quantity) && quantity > 0 ? quantity : 1;
  };
  const navigate = useNavigate();

  const updateQuantity = async (item, change) => {
    if (updating[item.id]) return;
    const quantity = Math.max(1, getQuantity(item) + change);
    setUpdating((current) => ({ ...current, [item.id]: true }));
    setQuantityError("");
    try {
      await updateCart(item.id, quantity);
      setQuantities((current) => ({ ...current, [item.id]: quantity }));
    } catch (error) {
      setQuantityError(error.message || "Unable to update cart quantity.");
    } finally {
      setUpdating((current) => ({ ...current, [item.id]: false }));
    }
  };

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

  const total = subtotal + shippingFee;
  const handleProceedToCheckout = async () => {
    navigate("/check_out");
  };
  const handleDelete = async (id) => {
    try {
      const response = await deleteCart(id);

      if (response) {
        setMessage(response.message);
        setModal(true);
      }
    } catch (error) {
      console.error("Error deleting address : ", error);
    }
  };
  const handleAddWishlist = async (id) => {
    try {
      const response = await addWishlist(id);
      if (response) {
        setMessage(response.message);
        setModal(true);
      }
      return response;
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  const backToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="shopping_cart">
        {quantityError && <Alert variant="danger">{quantityError}</Alert>}
        {carts.length === 0 ? (
          <div className="title d-flex flex-column align-items-center">
            <h3>Not in your cart</h3>
            <Button
              className="btn-secondary py-2 px-5 m-3"
              onClick={backToHome}
            >
              Back to home
            </Button>
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
                            {item.book?.discount_percentage > 0 ? (
                              <h4 className="text-danger">
                                RM
                                {(
                                  getQuantity(item) *
                                  (Number(item.book?.book_price) *
                                    (1 -
                                      Number(
                                        item.book?.discount_percentage ?? 0,
                                      ) /
                                        100))
                                ).toFixed(2)}
                              </h4>
                            ) : (
                              <h4>
                                RM
                                {(
                                  getQuantity(item) *
                                  Number(item.book?.book_price)
                                ).toFixed(2)}
                              </h4>
                            )}
                          </div>
                          <div className="author">
                            <span>{item.book?.author?.author_name}</span>
                          </div>
                          <div className="set_product">
                            <Row>
                              <Col xs={5} md={5} lg={4}>
                                <Button
                                  className="buttom"
                                  onClick={() =>
                                    handleAddWishlist(item.book?.id)
                                  }
                                >
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
                                    disabled={
                                      updating[item.id] ||
                                      getQuantity(item) <= 1
                                    }
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
                                      updating[item.id] ||
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
                    </div>
                    <div className="subtotal">
                      <h3 className="detail">Total</h3>
                      <h3 className="price">RM {total.toFixed(2)}</h3>
                    </div>
                    <div className="check_out py-3">
                      <Button
                        className="btn-success"
                        onClick={() => handleProceedToCheckout()}
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
          message={message}
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
        author: PropTypes.shape({
          author_name: PropTypes.string.isRequired,
        }),
        discount_percentage: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
        book_quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        book_isbn: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
      }),
      cart: PropTypes.shape({
        user: PropTypes.object,
      }),
    }),
  ).isRequired,
};

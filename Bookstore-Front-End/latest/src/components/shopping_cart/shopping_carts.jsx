import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { MdDelete, MdFavorite } from "react-icons/md";

export default function ShoppingCarts({ carts }) {
  const [num, setNumber] = useState(1);
  return (
    <>
      <div className="shopping_cart">
        {carts.length <= 1 ? (
          <div className="title">
            <h3>not in your cart</h3>
          </div>
        ) : (
          <>
            <div className="title">
              <h3>Shopping Cart</h3>
              <span>{carts.length} items in your cart.</span>
            </div>
            <div className="list_cart">
              <Row>
                <Col>
                  {carts.map((item) => (
                    <Card className="cart" key={item.id}>
                      <Row>
                        <Col sm={3} md={4} lg={3}>
                          <img src={item.img} alt={item.img} />
                        </Col>
                        <Col sm={3} md={8} lg={9}>
                          <div className="name_price">
                            <h3>{item.BookName}</h3>
                            <h4>RM{item.Price.toFixed(2)}</h4>
                          </div>
                          <div className="author">
                            <span>{item.Author}</span>
                          </div>
                          <div className="set_product">
                            <Row>
                              <Col md={5} lg={3}>
                                <Button className="buttom">
                                  <MdFavorite  className="me-1" /> Move to Wishlist
                                </Button>
                              </Col>
                              <Col md={3} lg={3}>
                                <Button className="buttom">
                                  <MdDelete className="me-1"/> Remove
                                </Button>
                              </Col>
                              <Col md={4} lg={6}>
                                <div className="h-100 d-flex flex-row justify-content-end align-items-center">
                                  <Button
                                    className="btn-light"
                                    onClick={() => setNumber(num - 1)}
                                    disabled={num <= 1}
                                  >
                                    -
                                  </Button>
                                  <input
                                    type="number"
                                    className="number"
                                    value={num}
                                  />
                                  <Button
                                    className="btn-light"
                                    onClick={() => setNumber(num + 1)}
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

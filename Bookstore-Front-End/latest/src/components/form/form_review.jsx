import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

export default function FormReview({ carts }) {
  return (
    <>
      <div className="form_review">
        <Row>
          <Col md={6} lg={6}>
            <div className="review_address">
              <h4>Shipping Information</h4>
              <p className="mb-1">Name: John Doe</p>
              <p>Address: 123</p>
              <p>City: 456</p>
              <p>State: 789</p>
            </div>
          </Col>
          <Col md={6} lg={6}>
            <div className="review_payment">
              <h4>Payment Information</h4>
              <p>Card Number: **** **** **** 1234</p>
              <p>Expiration Date: 12/24</p>
            </div>
          </Col>
        </Row>
        <div className="review_cart">
          <h4>Items in Order</h4>
          {carts.map((item) => (
            <Row key={item.id} className="review_cart_item mb-3">
              <Col md={3} lg={2}>
                <img src={item.img} alt={item.img} />
              </Col>
              <Col md={7} lg={7}>
                <div className="name_qty">
                  <h5>{item.BookName}</h5>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </Col>
              <Col md={2} lg={2}>
                <div className="price">
                  <span>RM{item.Price.toFixed(2)}</span>
                </div>
              </Col>
            </Row>
          ))}
        </div>
      </div>
    </>
  );
}

FormReview.propTypes = {
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

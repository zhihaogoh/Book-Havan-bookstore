import PropTypes from "prop-types";
import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaCcVisa } from "react-icons/fa";
import {
  MdDeliveryDining,
  MdLocationPin,
  MdPhone,
  MdSecurity,
} from "react-icons/md";

export default function OrderDetailOverview({ order }) {
  const totalQty = order.product.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const total = order.product.reduce(
    (total, item) => total + item.Price * item.quantity,
    0,
  );
  const shipping_fee = 4.5;

  return (
    <>
      <div className="order_detail">
        <Card className="order_code">
          <h1>
            #HKB-000{order.id} <small>{order.process_status}</small>
          </h1>
          <p>Purchased on {order.order_date}</p>
        </Card>
        <Card className="my-3">
          <div className="check_out_process p-3">
            <div className="process">
              <div
                className={`step ${order.process_status == "Confrin order" ? "active" : ""}`}
              >
                <span>1</span>
                <p>Confrim Order</p>
              </div>
            </div>

            <div className="step-line"></div>

            <div className="process">
              <div
                className={`step ${order.process_status == "Packing" ? "active" : ""}`}
              >
                <span>2</span>
                <p>Packing</p>
              </div>
            </div>

            <div className="step-line"></div>

            <div className="process">
              <div
                className={`step ${order.process_status == "Delivered" ? "active" : ""}`}
              >
                <span>3</span>
                <p>Deliveried</p>
              </div>
            </div>
            <div className="step-line"></div>

            <div className="process">
              <div
                className={`step ${order.process_status == "Reciver" ? "active" : ""}`}
              >
                <span>4</span>
                <p>Reciver</p>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <h1>Order listing ({totalQty} qty) </h1>
          {order.product.map((item, index) => (
            <Card className="order_list" key={index}>
              <Row key={item.id}>
                <Col xs={3} md={3} lg={3}>
                  <div className="product_img">
                    <img src={item.img} alt={item.BookName} />
                  </div>
                </Col>
                <Col xs={6} md={7} lg={7}>
                  <div className="detail">
                    <h3>{item.BookName}</h3>
                    <div className="d-flex flex-column">
                      <span className="my-3">Author : {item.Author}</span>
                      <span className="my-3">Quantity : {item.quantity}</span>
                    </div>
                  </div>
                </Col>
                <Col xs={3} md={2} lg={2}>
                  <div className="detail">
                    <span>Price : RM{item.Price.toFixed(2)} </span>
                  </div>
                </Col>
              </Row>
            </Card>
          ))}
        </Card>
        <Row className="my-3">
          <Col md={12} lg={6} xxl={6}>
            <Card className="delivery_address">
              <h1>Delivery & Payment detail</h1>
              <Row>
                <Col className="my-3" md={6} lg={6}>
                  <Card className="detail">
                    <span className="d-flex flex-row align-items-center">
                      <MdLocationPin className="icon" /> Shipping Destination
                    </span>
                    <h3>G</h3>
                    <span>128 Hill House Lane, Apt 4B</span>
                    <span>Arkham, MA 01915</span>
                    <span>United States</span>
                    <span className="mt-5 d-flex flex-row align-items-center">
                      <MdPhone className="icon" />
                      +1 (617) 555-0192
                    </span>
                  </Card>
                </Col>
                <Col className="my-3" md={6} lg={6}>
                  <Card className="detail">
                    <span className="d-flex flex-row align-items-center">
                      <MdDeliveryDining className="icon" /> Shipping Method
                    </span>
                    <h3>G</h3>
                    <span>2-3 Business Days Delivery</span>
                    <span className="mt-5 d-flex flex-row align-items-center">
                      <MdSecurity className="icon" />
                      Fully insured transit
                    </span>
                  </Card>
                </Col>
              </Row>
              <Card className="payment_detail mt-5">
                <FaCcVisa className="icon" />
                <div className="d-flex flex-column align-items-start">
                  <span>Visa ending in 4242</span>
                  <span>Billing address identical to shipping</span>
                </div>
                <span className="pay">Pay in full</span>
              </Card>
            </Card>
          </Col>
          <Col className="my-3" md={12} lg={6} xxl={6}>
            <Card className="total_payment">
              <h1>Total summary</h1>
              <div className="d-flex flex-row justify-content-between my-3">
                <span>Item Subtotal ({totalQty} books)</span>
                <span>RM {total.toFixed(2)}</span>
              </div>
              <div className="d-flex flex-row justify-content-between my-3">
                <span>Shipping Fee</span>
                <span>RM {shipping_fee.toFixed(2)}</span>
              </div>
              <div className="d-flex flex-row justify-content-between my-3">
                <h1>Total</h1>
                <h1>RM {total.toFixed(2)}</h1>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

OrderDetailOverview.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order_date: PropTypes.string.isRequired,
    process_status: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    product: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        BookName: PropTypes.string.isRequired,
        Author: PropTypes.string.isRequired,
        Price: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
      }),
    ),
  }),
};

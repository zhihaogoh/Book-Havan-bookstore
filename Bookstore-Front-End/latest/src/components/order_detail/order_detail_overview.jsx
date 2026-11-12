import PropTypes from "prop-types";
import { Card, Col, Row } from "react-bootstrap";
import { FaCcVisa } from "react-icons/fa";
import { MdDeliveryDining, MdLocationPin, MdPhone, MdSecurity } from "react-icons/md";

export default function OrderDetailOverview({
  order_number,
  placed_at,
  status,
  order_items,
  address,
  shipping_price,
  subtotal,
  grand_total,
  discount,
  tax
}) {
  const items = Array.isArray(order_items) ? order_items : [];
const totalQty = (order_items ?? []).reduce(
  (total, item) => total + Number(item.quantity ?? 0),
  0,
);
  return (
    <>
      <div className="order_detail">
        <Card className="order_code">
          <h1>
            #{order_number} <small>{status}</small>
          </h1>
          <p>Purchased on {placed_at}</p>
        </Card>
        <Card className="my-3">
          <div className="check_out_process p-3">
            <div className="process text-center">
              <div className={`step ${status == "pending" ? "active" : ""}`}>
                <span>1</span>
                <p>Confrim Order</p>
              </div>
            </div>

            <div className="step-line"></div>

            <div className="process text-center">
              <div className={`step ${status == "packing" ? "active" : ""}`}>
                <span>2</span>
                <p>Packing</p>
              </div>
            </div>

            <div className="step-line"></div>

            <div className="process text-center">
              <div className={`step ${status == "delivered" ? "active" : ""}`}>
                <span>3</span>
                <p>Deliveried</p>
              </div>
            </div>
            <div className="step-line"></div>

            <div className="process text-center">
              <div className={`step ${status == "reciver" ? "active" : ""}`}>
                <span>4</span>
                <p>Reciver</p>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <h1>Order listing ({totalQty} qty) </h1>
          {items.length === 0 && <p>No items are available for this order.</p>}
          {items.map((item) => (
            <Card className="order_list"  key={item.id}>
              <Row>
                <Col xs={3} md={3} lg={3}>
                  <div className="product_img">
                    <img
                      src={
                        item.img ?? "../src/assets/image/Product/Product1.jpg"
                      }
                      alt={item.title_book}
                    />
                  </div>
                </Col>
                <Col xs={6} md={7} lg={7}>
                  <div className="detail">
                    <h3>{item.title_book}</h3>
                    <div className="d-flex flex-column">
                      <span className="my-3">SKU : {item.SKU}</span>
                      <span className="my-3">Quantity : {Number(item.quantity)}</span>
                    </div>
                  </div>
                </Col>
                <Col xs={3} md={2} lg={2}>
                  <div className="detail">
                    <span>Price : RM{(Number(item.subtotal)).toFixed(2)} </span>
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
                    <h3>{address.recipient_name}</h3>
                    <span>{address.address_1}</span>
                    <span>{address.city}, {address.state} {address.postal_code}</span>
                    <span>{address.country}</span>
                    <span className="mt-5 d-flex flex-row align-items-center">
                      <MdPhone className="icon" />
                      {address.recipent_phone}
                    </span>
                  </Card>
                </Col>
                <Col className="my-3" md={6} lg={6}>
                  <Card className="detail">
                    <span className="d-flex flex-row align-items-center">
                      <MdDeliveryDining className="icon" /> Shipping Method
                    </span>
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
                <span>RM {(Number(subtotal)).toFixed(2)}</span>
              </div>
              <div className="d-flex flex-row justify-content-between my-3">
                <span>Discount Price</span>
                <span>RM {(Number(discount)).toFixed(2)}</span>
              </div>
              <div className="d-flex flex-row justify-content-between my-3">
                <span>Shipping Fee</span>
                <span>RM {(Number(shipping_price)).toFixed(2)}</span>
              </div>
             <div className="d-flex flex-row justify-content-between my-3">
                <span>Tax</span>
                <span>RM {(Number(tax)).toFixed(2)}</span>
              </div>
              <div className="d-flex flex-row justify-content-between my-3">
                <h1>Total</h1>
                <h1>RM {Number(grand_total).toFixed(2)}</h1>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

OrderDetailOverview.propTypes = {
  order_number: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  placed_at: PropTypes.string.isRequired,
  grand_total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shipping_price :PropTypes.oneOfType([PropTypes.number, PropTypes.string]), 
  subtotal :PropTypes.oneOfType([PropTypes.number, PropTypes.string]), 
  discount : PropTypes.oneOfType([PropTypes.number, PropTypes.string]), 
  tax : PropTypes.oneOfType([PropTypes.number, PropTypes.string]), 

  order_items: PropTypes.arrayOf(
    PropTypes.shape({
      SKU: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      subtotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title_book: PropTypes.string.isRequired,
    }),
  ),
  address: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      recipient_name: PropTypes.string,
      recipent_phone: PropTypes.string.isRequired,
      address_1: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      postal_code: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      status: PropTypes.bool,
    }),
};

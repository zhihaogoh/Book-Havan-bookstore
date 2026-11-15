import PropTypes from "prop-types";
import { Button, Card, Form } from "react-bootstrap";

export default function ListTotal({
  subtotal,
  shippingFee,
  sstPrice,
  total,
  totalItems,
}) {
  return (
    <Card className="d-lg-none mt-3 p-2 summary_price">
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
          <span className="detail">Subtotal ({Number(totalItems)} items)</span>
          <span className="price">RM{Number(subtotal).toFixed(2)}</span>
        </div>
        <div className="list_price">
          <span className="detail">Estimated Shipping</span>
          <span className="price">RM{Number(shippingFee).toFixed(2)}</span>
        </div>
        <div className="list_price">
          <span className="detail">Tax</span>
          <span className="price">RM {Number(sstPrice).toFixed(2)}</span>
        </div>
      </div>
      <div className="subtotal">
        <h3 className="detail">Total</h3>
        <h3 className="price">RM {Number(total).toFixed(2)}</h3>
      </div>
    </Card>
  );
}

ListTotal.propTypes = {
  subtotal: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  totalItems: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  shippingFee: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  sstPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

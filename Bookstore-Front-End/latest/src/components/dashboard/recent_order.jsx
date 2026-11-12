import { Card, Col, Row } from "react-bootstrap";
import { getSortOrders } from "../../routes/getSortOrder";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

export default function RecentOrder({ order }) {
  const orders = order;
  const navigate = useNavigate();
  const recentOrders = getSortOrders(orders, 2);
  const toListOrder = () => {
    navigate("/list_order");
  };
  const toOrderDetial = (orderId) => {
    navigate(`/order_detail/${orderId}`);
  };
  return (
    <>
      <div className="recent_order mt-3">
        <div className="title">
          <h3>Recent Order</h3>
          <span onClick={toListOrder}>View All</span>
        </div>
        <div className="list_order">
          {recentOrders.map((item) => (
            <Card
              className="my-3"
              key={item.id}
              onClick={() => toOrderDetial(item.id)}
            >
              <div className="card_order p-3">
                <div className="order_name">
                  <h3>{item.order_number}</h3>
                  <span>{item.placed_at}</span>
                </div>
                <div className="order_price">
                  <h3>
                    RM
                    {Number(item.grand_total).toFixed(2)}
                  </h3>
                  <div className="status">
                    <span>{item.status}</span>
                  </div>
                </div>
              </div>
              <div className="order_detail">
                {item.order_items.map((product) => (
                  <Row className="my-3" key={product.id}>
                    <Col xs={3} md={3} lg={3}>
                      <div className="product_img">
                        <img
                          src={
                            product.img ??
                            "../src/assets/image/Product/Product1.jpg"
                          }
                          alt={product.title_book}
                        />
                      </div>
                    </Col>
                    <Col xs={9} md={9} lg={9}>
                      <div className="detail">
                        <h3>{product.title_book}</h3>
                        <span>SKU : {product.SKU}</span>
                        <div className="d-flex flex-row justify-content-between">
                          <span>Quantity : {Number(product.quantity)}</span>
                          <span>
                            Price : RM
                            {Number(product.subtotal).toFixed(2)}{" "}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
RecentOrder.propTypes = {
  order: PropTypes.arrayOf(
    PropTypes.shape({
      order_number: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      placed_at: PropTypes.string.isRequired,
      grand_total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      order_items: PropTypes.arrayOf(
        PropTypes.shape({
          SKU: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
          quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          subtotal: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]),
          title_book: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
};

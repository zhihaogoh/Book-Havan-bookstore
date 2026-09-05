import { Card, Col, Row } from "react-bootstrap";
import { order } from "../../data/products";
import { getSortOrders } from "../../routes/getSortOrder";
import { useNavigate } from "react-router";

export default function RecentOrder() {
  const orders = order;
  const navigate = useNavigate();
  const recentOrders = getSortOrders(orders, 3);
  const toListOrder = () => {
    navigate("/list_order");
  };
  return (
    <>
      <div className="recent_order mt-3">
        <div className="title">
          <h3>Recent Order</h3>
          <span onClick={toListOrder}>View All</span>
        </div>
        <div className="list_order">
          {recentOrders.map((item, index) => (
            <Card className="my-3" key={index}>
              <div className="card_order p-3">
                <div className="order_name">
                  <h3>{item.id}</h3>
                  <span>{item.order_date}</span>
                </div>
                <div className="order_price">
                  <h3>RM{item.Price.toFixed(2)}</h3>
                  <div className="status">
                    <span>{item.process_status}</span>
                  </div>
                </div>
              </div>
              <div className="order_detail">
                <Row>
                  <Col xs={3} md={3} lg={3}>
                    <div className="product_img">
                      <img src={item.img} alt={item.img} />
                    </div>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <div className="detail">
                      <h3>{item.BookName}</h3>
                      <span>Author : {item.Author}</span>
                      <span>Quantity : {item.quantity}</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

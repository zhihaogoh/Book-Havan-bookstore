import { Card, Col, Nav, NavItem, Row, Tab } from "react-bootstrap";
import { order } from "../../data/products";
import { getSortOrders } from "../../routes/getSortOrder";
import { useNavigate } from "react-router";

export default function OrderListing() {
  const navigate = useNavigate();
  const orders = order;
  const sortOrders = getSortOrders(orders, 3);
  const toOrderDetial = (orderId) => {
    navigate(`/order_detail/${orderId}`);
  };
  return (
    <>
      <div className="order_listing">
        <div className="title">
          <h3>Order History</h3>
          <span>
            Track your recent purchases, view digital receipts, and manage
            returns for your physical and digital volumes.
          </span>
        </div>
        <Tab.Container defaultActiveKey={1}>
          <div className="order_status">
            <Nav variant="pills">
              <NavItem>
                <Nav.Link eventKey={1}>All Order</Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link eventKey={2}>Deliver</Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link eventKey={3}>Cancel</Nav.Link>
              </NavItem>
            </Nav>
          </div>
          <div className="listing">
            <Tab.Content>
              <Tab.Pane eventKey={1}>
                {sortOrders.map((item) => (
                  <Card className="my-3" key={item.id} onClick={() => toOrderDetial(item.id)}>
                    <div className="card_order p-3">
                      <div className="order_name">
                        <h3>{item.id}</h3>
                        <span>{item.order_date}</span>
                      </div>
                      <div className="order_price">
                        <h3>
                          RM
                          {item.product
                            .reduce(
                              (total, product) =>
                                total + product.Price * product.quantity,
                              0,
                            )
                            .toFixed(2)}
                        </h3>
                        <div className="status">
                          <span>{item.process_status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="order_detail">
                      {item.product.map((product) => (
                        <Row
                          className="my-3"
                          key={product.id}
                          onClick={() => toOrderDetial(item.id)}
                        >
                          <Col xs={3} md={3} lg={3}>
                            <div className="product_img">
                              <img src={product.img} alt={product.BookName} />
                            </div>
                          </Col>
                          <Col xs={9} md={9} lg={9}>
                            <div className="detail">
                              <h3>{product.BookName}</h3>
                              <span>Author : {product.Author}</span>
                              <div className="d-flex flex-row justify-content-between">
                                <span>Quantity : {product.quantity}</span>
                                <span>Price :{product.Price.toFixed(2)} </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ))}
                    </div>
                  </Card>
                ))}
              </Tab.Pane>
              <Tab.Pane eventKey={2}>
                {sortOrders
                  .filter((item) => item.process_status === "Delivered")
                  .map((item) => (
                    <Card
                      className="my-3"
                      key={item.id}
                      onClick={() => toOrderDetial(item.id)}
                    >
                      <div className="card_order p-3">
                        <div className="order_name">
                          <h3>{item.id}</h3>
                          <span>{item.order_date}</span>
                        </div>
                        <div className="order_price">
                          <h3>
                            RM
                            {item.product
                              .reduce(
                                (total, product) =>
                                  total + product.Price * product.quantity,
                                0,
                              )
                              .toFixed(2)}
                          </h3>
                          <div className="status">
                            <span>{item.process_status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="order_detail">
                        {item.product.map((product) => (
                          <Row
                            className="my-3"
                            key={product.id}
                          >
                            <Col xs={3} md={3} lg={3}>
                              <div className="product_img">
                                <img src={product.img} alt={product.BookName} />
                              </div>
                            </Col>
                            <Col xs={9} md={9} lg={9}>
                              <div className="detail">
                                <h3>{product.BookName}</h3>
                                <span>Author : {product.Author}</span>
                                <div className="d-flex flex-row justify-content-between">
                                  <span>Quantity : {product.quantity}</span>
                                  <span>
                                    Price :{product.Price.toFixed(2)}{" "}
                                  </span>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        ))}
                      </div>
                    </Card>
                  ))}
              </Tab.Pane>
              <Tab.Pane eventKey={3}>
                {sortOrders
                  .filter((item) => item.process_status === "Canceled")
                  .map((item) => (
                    <Card className="my-3" key={item.id} onClick={() => toOrderDetial(item.id)}>
                      <div className="card_order p-3">
                        <div className="order_name">
                          <h3>{item.id}</h3>
                          <span>{item.order_date}</span>
                        </div>
                        <div className="order_price">
                          <h3>
                            RM
                            {item.product
                              .reduce(
                                (total, product) =>
                                  total + product.Price * product.quantity,
                                0,
                              )
                              .toFixed(2)}
                          </h3>
                          <div className="status">
                            <span>{item.process_status}</span>
                          </div>
                        </div>
                      </div>
                      <div className="order_detail">
                        {item.product.map((product) => (
                          <Row key={product.id}>
                            <Col xs={3} md={3} lg={3}>
                              <div className="product_img">
                                <img src={product.img} alt={product.BookName} />
                              </div>
                            </Col>
                            <Col xs={9} md={9} lg={9}>
                              <div className="detail">
                                <h3>{product.BookName}</h3>
                                <span>Author : {product.Author}</span>
                                <div className="d-flex flex-row justify-content-between">
                                  <span>Quantity : {product.quantity}</span>
                                  <span>
                                    Price :{product.Price.toFixed(2)}{" "}
                                  </span>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        ))}
                      </div>
                    </Card>
                  ))}
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
    </>
  );
}

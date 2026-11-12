import { Card, Col, Nav, NavItem, Row, Tab } from "react-bootstrap";

import { getSortOrders } from "../../routes/getSortOrder";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

export default function OrderListing({ order }) {
  const navigate = useNavigate();

  const sortOrders = getSortOrders(order, 3);
  console.log(sortOrders);
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
                <Nav.Link eventKey={2}>Pending</Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link eventKey={3}>Deliver</Nav.Link>
              </NavItem>
              <NavItem>
                <Nav.Link eventKey={4}>Cancel</Nav.Link>
              </NavItem>
            </Nav>
          </div>
          <div className="listing">
            <Tab.Content>
              <Tab.Pane eventKey={1}>
                {sortOrders.map((item) => (
                  <Card
                    className="my-3"
                    key={item.id}
                    onClick={() => toOrderDetial(item.id)}
                  >
                    <div className="card_order p-3">
                      <div className="order_name">
                        <h3>Purchase order : {item.order_number}</h3>
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
                        <Row
                          className="my-3"
                          key={product.id}
                          onClick={() => toOrderDetial(item.id)}
                        >
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
                                <span>
                                  Quantity : {Number(product.quantity)}
                                </span>
                                <span>
                                  Price : RM
                                  {Number(product.price_per_unit).toFixed(
                                    2,
                                  )}{" "}
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
              <Tab.Pane eventKey={2}>
                {sortOrders
                  .filter((item) => item.status === "pending")
                  .map((item) => (
                    <Card
                      className="my-3"
                      key={item.id}
                      onClick={() => toOrderDetial(item.id)}
                    >
                      <div className="card_order p-3">
                        <div className="order_name">
                          <h3>Purchase order : {item.order_number}</h3>
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
                                  <span>
                                    Quantity : {Number(product.quantity)}
                                  </span>
                                  <span>
                                    Price : RM
                                    {Number(product.price_per_unit).toFixed(
                                      2,
                                    )}{" "}
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
                  .filter((item) => item.status === "delivered")
                  .map((item) => (
                    <Card
                      className="my-3"
                      key={item.id}
                      onClick={() => toOrderDetial(item.id)}
                    >
                      <div className="card_order p-3">
                        <div className="order_name">
                          <h3>Purchase order : {item.order_number}</h3>
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
                                  <span>
                                    Quantity : {Number(product.quantity)}
                                  </span>
                                  <span>
                                    Price : RM
                                    {Number(product.price_per_unit).toFixed(
                                      2,
                                    )}{" "}
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
              <Tab.Pane eventKey={4}>
                {sortOrders
                  .filter((item) => item.status === "canceled")
                  .map((item) => (
                    <Card
                      className="my-3"
                      key={item.id}
                      onClick={() => toOrderDetial(item.id)}
                    >
                      <div className="card_order p-3">
                        <div className="order_name">
                          <h3>Purchase order : {item.order_number}</h3>
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
                          <Row key={product.id}>
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
                                  <span>
                                    Quantity : {Number(product.quantity)}
                                  </span>
                                  <span>
                                    Price : RM
                                    {Number(product.subtotal).toFixed(
                                      2,
                                    )}{" "}
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

OrderListing.propTypes = {
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

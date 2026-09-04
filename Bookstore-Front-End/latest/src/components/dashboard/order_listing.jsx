import { Card, Col, Form, Nav, NavItem, Row, Tab } from "react-bootstrap";
import { order } from "../../data/products";

export default function OrderListing() {
  const orders = order;
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
         
          <div className="sort">
            <span className="pe-3">Sort By : </span>
            <Form>
              <Form.Group controlId="formGridState">
                <Form.Select defaultValue="Most Popular">
                  <option>Most Popular</option>
                  <option>Default</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className="listing">
          <Tab.Content>
            <Tab.Pane eventKey={1}>
              {orders.map((item, index) =>(
                <>
                <Card className="my-3">
                  <div className="card_order p-3" key={index}>
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
                </>
             ) )}
            </Tab.Pane>
          </Tab.Content>
        </div>
         </Tab.Container>
      </div>
    </>
  );
}

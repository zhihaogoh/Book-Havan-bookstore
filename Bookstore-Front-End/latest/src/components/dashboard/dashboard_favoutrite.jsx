import { Col, Form, Row } from "react-bootstrap";
import { products } from "../../data/products";
import CardProduct from "../card_product/card_product";

export default function DashboardFavourite() {
  const product = products;
  return (
    <>
      <div className="dashboard_favourite">
        <div className="title py-3">
          <h3>Wishlist</h3>
          <span>
            Your curated collection of titles waiting to be explored. Books
            saved here will remain until you choose to purchase or remove them.
          </span>
        </div>
        <div className="result_favourite">
          <span>{product.length} items saved</span>
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
              <Row>
        {product.map((item,index) => (
          <Col className="p-3" xs={6} md={6} lg={4} key={index}>
            <CardProduct product={item} />
          </Col>
        ))}
      </Row>
      </div>
    </>
  );
}

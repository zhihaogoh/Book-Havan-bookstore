import PropTypes from "prop-types";
import { Col, Form, Pagination, Row } from "react-bootstrap";
import CardProduct from "../card_product/card_product";

export default function ProductResult({ products, selectedCategories }) {
  const resultLabel = selectedCategories.length
    ? selectedCategories.join(", ")
    : "All categories";

  return (
    <>
      <div className="result_product">
        <div className="title">
          <h3>
            {products.length} {products.length === 1 ? "result" : "results"} for{" "}
            &quot;{resultLabel}&quot;
          </h3>
          <div className="sort">
            <span>Sort By : </span>
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
        <div className="listing_product py-3">
          <Row>
            {products.map((item) => (
              <Col xs={6} md={6} lg={4} xl={3} key={item.id} className="mb-3">
                <CardProduct product={item} />
              </Col>
            ))}
            {products.length === 0 && (
              <Col>
                <p className="text-center py-5 mb-0">
                  No products found in the selected category.
                </p>
              </Col>
            )}
          </Row>
        </div>
        <Pagination className="justify-content-center">
          
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Item>{5}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{22}</Pagination.Item>
          <Pagination.Next />

        </Pagination>
      </div>
    </>
  );
}

ProductResult.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
      BookName: PropTypes.string.isRequired,
      Author: PropTypes.string.isRequired,
      star: PropTypes.number.isRequired,
      viewNumber: PropTypes.number.isRequired,
      Price: PropTypes.number.isRequired,
      discount: PropTypes.number,
      stock: PropTypes.bool,
      category: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

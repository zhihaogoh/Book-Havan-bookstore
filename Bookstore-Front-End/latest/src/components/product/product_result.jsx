import PropTypes from "prop-types";
import { Col, Form, Pagination, Row } from "react-bootstrap";
import CardProduct from "../card_product/card_product";
import { useState } from "react";

export default function ProductResult({
  products,
  selectedCategories,
  keyword,
  currentPage,
  lastPage,
  onPageChange,
}) {
  const resultLabel = selectedCategories.length
    ? selectedCategories.join(", ")
    : "All categories";
  const [sortBy, setSortBy] = useState("default");
  const sortedProduct = [...products];
  const getFinalPrice = (product) => {
    return product.Price * (1 - (product.discount ?? 0) / 100);
  };
  if (sortBy === "more") {
    sortedProduct.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
    console.log(sortedProduct);
  } else if (sortBy === "less") {
    sortedProduct.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
    console.log(sortedProduct);
  } else if (sortBy === "az") {
    sortedProduct.sort((a, b) => a.BookName.localeCompare(b.BookName));
  } else if (sortBy === "za") {
    sortedProduct.sort((a, b) => b.BookName.localeCompare(a.BookName));
  }
  return (
    <>
      <div className="result_product">
        <div className="title">
          <h3>
            {products.length} {products.length === 1 ? "result" : "results"} for{" "}
            &quot;
            {keyword ? ` ${keyword}` : `${resultLabel}`}
            &quot;
          </h3>
          <div className="sort">
            <span>Sort By : </span>
            <Form>
              <Form.Group controlId="formGridState">
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="more">More to less</option>
                  <option value="less">Less to more</option>
                  <option value="az">A - Z</option>
                  <option value="za">Z - A</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className="listing_product py-3">
          <Row>
            {sortedProduct.map((item) => (
              <Col xs={6} md={6} lg={4} xl={3} key={item.id} className="mb-3">
                <CardProduct product={item} />
              </Col>
            ))}
            {sortedProduct.length === 0 && (
              <Col>
                <p className="not_result text-center py-5 mb-0">
                  No products found in the selected category.
                </p>
              </Col>
            )}
          </Row>
        </div>
        <Pagination className="justify-content-center">
          <Pagination.Prev 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: lastPage }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}         
          <Pagination.Next 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === lastPage}
          />
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
  keyword: PropTypes.string.isRequired,
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentPage: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

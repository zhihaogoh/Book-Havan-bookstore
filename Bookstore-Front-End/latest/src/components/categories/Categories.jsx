import PropTypes from "prop-types";
import { Card, Col, Row } from "react-bootstrap";

export default function Categories({ categories }) {
  return (
    <>
      <div className="categories container">
        <div className="title">
          <h2>Shop by Categories</h2>
        </div>
        <div className="categories_list">
          <Row xs={2} md={4} lg={5} className="g-4">
            {categories.map((item, index) => (
              <Col key={index}>
                <Card >
                  <h3>{item.category}</h3>
                  <p>{item.books_number} books</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      books_number: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

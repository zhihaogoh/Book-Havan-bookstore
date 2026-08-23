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
          <Row xs={2} md={3} lg={6} className="g-4">
            {categories.map((item, index) => (
              <Col key={index}>
                <Card className="h-100">
                  <img src={item.icon} alt={item.icon} />
                  <h3 className="mt-2">{item.category}</h3>
                  { item.books_number > 1 ?
                  <p>{item.books_number} books</p>
                  : <></>
                  }
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

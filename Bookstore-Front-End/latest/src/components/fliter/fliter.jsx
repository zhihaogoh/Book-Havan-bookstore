import PropTypes from "prop-types";
import { Col, Form, FormCheck, FormControl, Row } from "react-bootstrap";

export default function Fliter({
  check_categories,
  selectedCategories,
  minPrice,
  maxPrice,
  inStockOnly,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onStockChange,
  onClearAll,
}) {
  const hasActiveFilters =
    selectedCategories.length > 0 ||
    minPrice !== "" ||
    maxPrice !== "" ||
    inStockOnly;
  //没有填充或空就会没有按钮
  return (
    <>
      <div className="fliter">
        <div className="title">
          <h3>Fliter</h3>
          <button
            type="button"
            className="btn p-0 clear-filter"
            onClick={onClearAll} // 这是按全部清除
            disabled={!hasActiveFilters}
          >
            Clear All
          </button>
        </div>
        <div className="list_fliter">
          <div className="categories">
            <Form>
              {check_categories.map((item, index) => (
                <div className="mb-3" key={index}>
                  <Form.Check
                    className="check"
                    label={item.category}
                    id={item.category}
                    checked={selectedCategories.includes(item.category)}
                    onChange={() => onCategoryChange(item.category)}
                  />
                </div>
              ))}
            </Form>
          </div>
          <div className="price py-3">
            <div className="title border-0">
              <h3>Price Range</h3>
            </div>
            <Form>
              <Row>
                <Col lg={5} >
                  <FormControl
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="RM Min"
                    aria-label="Minimum price"
                    value={minPrice}
                    onChange={(event) => onMinPriceChange(event.target.value)}
                  />
                </Col>
                <Col lg={1} className="text-center p-0">
                  <span>-</span>
                </Col>
                <Col lg={5}>
                  <FormControl
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="RM Max"
                    aria-label="Maximum price"
                    value={maxPrice}
                    onChange={(event) => onMaxPriceChange(event.target.value)}
                  />
                </Col>
              </Row>
            </Form>
          </div>
          <div className="avalibity py-3">
            <div className="title border-0">
              <h3>Availability</h3>
            </div>
            <Form>
              <FormCheck
                type="switch"
                id="availability"
                label="In Stock Only"
                checked={inStockOnly}
                onChange={(event) => onStockChange(event.target.checked)}
              />
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

Fliter.propTypes = {
  check_categories: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
    }),
  ),
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  minPrice: PropTypes.string.isRequired,
  maxPrice: PropTypes.string.isRequired,
  inStockOnly: PropTypes.bool.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onMinPriceChange: PropTypes.func.isRequired,
  onMaxPriceChange: PropTypes.func.isRequired,
  onStockChange: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired,
  rating: PropTypes.arrayOf(
    PropTypes.shape({
      rate: PropTypes.number.isRequired,
    }),
  ),
};

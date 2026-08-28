import PropTypes from "prop-types";
import { Col, Form, FormCheck, FormControl, Row } from "react-bootstrap";

export default function Fliter({ check_categories}) {
  return (
    <>
      <div className="fliter">
        <div className="title">
          <h3>Fliter</h3>
          <span>Clear All</span>
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
                <Col lg={5} className="pe-0">
                  <FormControl type="number" placeholder="RM Min" />
                </Col>
                <Col lg={1} className="text-center p-0">
                  <span>-</span>
                </Col>
                <Col lg={5} className="p-0">
                  <FormControl type="number" placeholder="RM Max" />
                </Col>
              </Row>
            </Form>
          </div>
          <div className="avalibity py-3">
            <div className="title border-0">
              <h3>Avalibility</h3>
            </div>
            <Form>
              <FormCheck type="switch" id="avalibility" label="In Stock Only" />
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
  rating: PropTypes.arrayOf(
    PropTypes.shape({
      rate: PropTypes.number.isRequired,
    }),
  ),
};

import { Button, Col, Modal, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function SuccessStatus({ img, number, product, ...props }) {
  const navigate = useNavigate();
  const toShoppingCart = () => {
    navigate("/shopping_cart");
  };
  const back = () => {
    navigate(-1);
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="success_status">
              <FaCheck className="icon" />
              <div className="status">
                <h1>Added to Your Cart</h1>
                <span>Ready for checkout or continue browsing</span>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={3}>
              <img className="modal_img" src={img} alt={img} />
            </Col>
            <Col md={6}>
              <div className="d-flex flex-column align-items-start">
                <h3>{product.book_name}</h3>
                <span>by : {product.author?.author_name}</span>
                <span>Qty: {number}</span>
              </div>
            </Col>
            <Col md={3}>
              <span>RM {(number* product.book_price).toFixed(2)}</span>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className="continue" onClick={back}>
            Continue
          </Button>
          <Button className="to_cart" onClick={toShoppingCart}>
            To Shopping Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

SuccessStatus.propTypes = {
  number: PropTypes.number.isRequired,
  product: PropTypes.shape({
    img: PropTypes.string.isRequired,
    book_name: PropTypes.string.isRequired,
    author: PropTypes.shape({
      author_name: PropTypes.string.isRequired,
    }).isRequired,
    book_price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  img: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
};

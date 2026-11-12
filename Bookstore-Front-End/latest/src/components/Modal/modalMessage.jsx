import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";

export default function ModalMessage({
  onBackToLogin,
  message,
  ...props
}) {


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
                <h1>{message}</h1>
                <span>Ready for checkout or continue browsing</span>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
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
              {product.discount_percentage > 0 ? (
                <span>
                  <p className="price text-danger fw-bold">
                    RM{discount.toFixed(2)}
                  </p>
                  <p className="price_del">
                    <del>RM{price.toFixed(2)}</del>
                  </p>
                </span>
              ) : (
                <span>RM{price.toFixed(2)}</span>
              )}
            </Col>
          </Row>
        </Modal.Body> */}
        <Modal.Footer>
          <Button className="to_cart" onClick={onBackToLogin}>
            Back to login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ModalMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  //func 是回去之前的file里设置
  onBackToLogin: PropTypes.func.isRequired,
};

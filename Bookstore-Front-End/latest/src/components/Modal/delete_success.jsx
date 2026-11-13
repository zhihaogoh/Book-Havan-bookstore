import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function DeleteStatus({ link, message, ...props }) {
  const navigate = useNavigate();
  const toShoppingCart = () => {
    if (link) {
      navigate(`/${link}`);
    } else {
      window.location.replace(window.location.href);
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="success_status">
              <FaCheck className="icon" />
              <div className="status">
                <h1>{message}</h1>
                <span>Ready for continue browsing</span>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>
        <Row>
          <Col md={3}>
            <img className="modal_img" src={product.img} alt={product.img} />
          </Col>
          <Col md={6}>
            <div className="d-flex flex-column align-items-start">
              <h3>{product.BookName}</h3>
              <span>by : {product.Author}</span>
              <span>Qty: {number}</span>
            </div>
          </Col>
          <Col md={3}>
            <span>RM {product.Price}</span>
          </Col>
        </Row>
      </Modal.Body> */}
        <Modal.Footer>
          <Button className="btn-success to_cart" onClick={() => toShoppingCart(link)}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

DeleteStatus.propTypes = {
  link: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
};

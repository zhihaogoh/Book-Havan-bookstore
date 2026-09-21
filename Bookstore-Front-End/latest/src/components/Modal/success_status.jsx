import { Button, Col, Modal, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function SuccessStatus({ number, product, ...props }){
  const navigate = useNavigate();
  const toShoppingCart = () =>{
    navigate("/shopping_cart");
  }

    return(
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
      </Modal.Body>
      <Modal.Footer>
        <Button className="continue" onClick={props.onHide}>Continue</Button>
        <Button className="to_cart" onClick={toShoppingCart}>To Shopping Cart</Button>
      </Modal.Footer>
    </Modal>
        </>
    )
}

SuccessStatus.propTypes ={
  number: PropTypes.number.isRequired,
  product: PropTypes.shape({
    img: PropTypes.string.isRequired,
    BookName: PropTypes.string.isRequired,
    Author: PropTypes.string.isRequired,
    Price: PropTypes.number.isRequired
  }).isRequired,
  onHide: PropTypes.func.isRequired,
}

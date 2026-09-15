import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function SuccessStatus(props){
  const navigate = useNavigate();
  const toShoppingCart = () =>{
    navigate("/shopping_cart");
  }
    return(
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
              <h1>Added to Your Cart</h1>
              <span>Ready for checkout or continue browsing</span>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      {/* <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body> */}
      <Modal.Footer>
        <Button className="continue" onClick={props.onHide}>Continue</Button>
        <Button className="to_cart" onClick={toShoppingCart}>To Shopping Cart</Button>
      </Modal.Footer>
    </Modal>
        </>
    )
}

SuccessStatus.propTypes ={
  onHide: PropTypes.func.isRequired,
}

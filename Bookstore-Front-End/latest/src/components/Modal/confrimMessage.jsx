import { Button, Modal, ModalBody } from "react-bootstrap";
import PropTypes from "prop-types";
import { MdError } from "react-icons/md";

export default function ConfrimMessage({ submit, message, ...props }) {
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <ModalBody>
          <div className="success_status">
            <MdError className="notice" />
            <div className="status">
              <h1>{message}</h1>
            </div>
          </div>
        </ModalBody>
        <Modal.Footer>
          <Button className="to_cart" onClick={props.onHide}>
            Cancel
          </Button>
          <Button className="to_cart" onClick={submit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ConfrimMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

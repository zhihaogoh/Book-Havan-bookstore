import { Row } from "react-bootstrap";
import {
  MdOutlineLocalShipping,
  MdOutlineSecurity,
  MdReplay30,
  MdOutlineReply,
} from "react-icons/md";

export default function ServiceList() {
  return (
    <>
      <div className="container service_list">
        <Row xs={4} md={8} lg={12} className="g-4">
          <div className="service_list_item">
            <MdOutlineLocalShipping className="me-2 service_icon" />
            <div className="service_list_item_text">
              <h5>Free Shipping</h5>
              <p>On orders over RM150.00</p>
            </div>
          </div>
          <div className="service_list_item">
            <MdOutlineSecurity className="me-2 service_icon" />
            <div className="service_list_item_text">
              <h5>Secure Payment</h5>
              <p>100% secure checkout</p>
            </div>
          </div>
          <div className="service_list_item">
            <MdReplay30 className="me-2 service_icon" />
            <div className="service_list_item_text">
              <h5>30-Day Returns</h5>
              <p>Hassle-free returns</p>
            </div>
          </div>
          <div className="service_list_item">
            <MdOutlineReply className="me-2 service_icon" />
            <div className="service_list_item_text">
              <h5>24/7 Support</h5>
              <p>We&apos;re here to help</p>
            </div>
          </div>
        </Row>
      </div>
    </>
  );
}

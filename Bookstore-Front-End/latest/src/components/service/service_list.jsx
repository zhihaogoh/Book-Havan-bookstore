import { Row } from "react-bootstrap";
import { MdOutlineLocalShipping } from "react-icons/md";

export default function ServiceList() {
  return (
    <>
      <div className="container service_list">
        <Row xs={4} md={8} lg={12} className="g-4">
          <div className="service_list_item">
            <MdOutlineLocalShipping className="me-2 service_icon"/>
            <div className="service_list_item_text">
              <h5>Free Shipping</h5>
              <p>On orders over RM150.00</p>
            </div>
          </div>
          <div className="service_list_item">
            <MdOutlineLocalShipping className="me-2 service_icon"/>
            <div className="service_list_item_text">
              <h5>Free Shipping</h5>
              <p>On orders over RM150.00</p>
            </div>
          </div>
          <div className="service_list_item">
            <MdOutlineLocalShipping className="me-2 service_icon"/>
            <div className="service_list_item_text">
              <h5>Free Shipping</h5>
              <p>On orders over RM150.00</p>
            </div>
          </div>
          <div className="service_list_item">
            <MdOutlineLocalShipping className="me-2 service_icon"/>
            <div className="service_list_item_text">
              <h5>Free Shipping</h5>
              <p>On orders over RM150.00</p>
            </div>
          </div>
        </Row>
      </div>
    </>
  );
}

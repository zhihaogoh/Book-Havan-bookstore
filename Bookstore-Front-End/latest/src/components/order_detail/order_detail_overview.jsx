import PropTypes from "prop-types";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
} from "react-bootstrap";
import { FaCartArrowDown, FaCcVisa, FaMap, FaShippingFast } from "react-icons/fa";
import {
  MdDeliveryDining,
  MdLocationPin,
  MdPerson,
  MdPhone,
  MdSecurity,
} from "react-icons/md";
import { useNavigate } from "react-router";
import ConfrimMessage from "../Modal/confrimMessage";
import { cancelOrderId } from "../../auth/auth";
import DeleteStatus from "../Modal/delete_success";

export default function OrderDetailOverview({
  id,
  order_number,
  placed_at,
  status,
  order_items,
  address,
  shipping_price,
  subtotal,
  grand_total,
  discount,
  tax,
}) {
  const navigate = useNavigate("");
  const items = Array.isArray(order_items) ? order_items : [];
  const totalQty = (order_items ?? []).reduce(
    (total, item) => total + Number(item.quantity ?? 0),
    0,
  );
  const [link, setLink] = useState("");
  const [modal, setModal] = useState(false);
  const [confrim, setConfrim] = useState(false);
  const [message, setMessage] = useState("");

  const backOrder = () => {
    navigate("/list_order");
  };

  const CancelOrder = async (id) => {
    try {
      const response = await cancelOrderId(id);
      setLink("list_order");
      setModal(true);
      setMessage(response.message);
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <>
      <div className="order_detail">
        <Card className="order_code d-md-flex flex-md-row justify-content-between align-items-md-center">
          <h1>
            #{order_number}{" "}
            <small
              className={`${status == "pending" ? "pending" : status == "processing" ? "processing" : status == "delivered" ? "delivered" : status == "recliver" ? "recliver" : ""}`}
            >
              {status}
            </small>
          </h1>
          <p>Purchased on {placed_at}</p>
        </Card>
        {status !== "cancelled" ? (
          <>
            <Card className="my-3">
              <div className="check_out_process p-3">
                <div className="process text-center">
                  <div
                    className={`step ${status == "pending" ? "active" : ""}`}
                  >
                    <span>1</span>
                    <p>Confrim Order</p>
                  </div>
                </div>

                <div className="step-line"></div>

                <div className="process text-center">
                  <div
                    className={`step ${status == "processing" ? "active" : ""}`}
                  >
                    <span>2</span>
                    <p>Packing</p>
                  </div>
                </div>

                <div className="step-line"></div>

                <div className="process text-center">
                  <div
                    className={`step ${status == "delivered" ? "active" : ""}`}
                  >
                    <span>3</span>
                    <p>Deliveried</p>
                  </div>
                </div>
                <div className="step-line"></div>

                <div className="process text-center">
                  <div
                    className={`step ${status == "recliver" ? "active" : ""}`}
                  >
                    <span>4</span>
                    <p>Recliver</p>
                  </div>
                </div>
              </div>
            </Card>
          </>
        ) : (
          ""
        )}
        <Card className="p-3 my-3">
          <h1>Order listing ({totalQty} qty) </h1>
          {items.length === 0 && <p>No items are available for this order.</p>}
          {items.map((item) => (
            <Card className="order_list" key={item.id}>
              <Row>
                <Col xs={6} md={6} lg={3}>
                  <div className="product_img">
                    <img
                      src={
                        item.img ?? "../src/assets/image/Product/Product1.jpg"
                      }
                      alt={item.title_book}
                    />
                  </div>
                </Col>
                <Col xs={6} md={6} lg={6}>
                  <div className="detail">
                    <h3>{item.title_book}</h3>
                    <div className="d-flex flex-column">
                      <span className="my-3">SKU : {item.SKU}</span>
                      <span className="my-3">
                        Quantity : {Number(item.quantity)}
                      </span>
                      <span className="d-lg-none d-md-block y-3">
                        Price : RM{Number(item.subtotal).toFixed(2)}{" "}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col
                  className="d-lg-block d-md-none d-sm-none"
                  xs={0}
                  md={0}
                  lg={3}
                >
                  <div className="detail">
                    <span>Price : RM{Number(item.subtotal).toFixed(2)} </span>
                  </div>
                </Col>
              </Row>
            </Card>
          ))}
        </Card>
        <Row className="my-3">
          <Col md={12} lg={7} xxl={6}>
            <Card className="delivery_address">
              <CardHeader>
                <FaShippingFast className="icon" />
                <div className="title">
                  <h1>Delivery & Payment detail</h1>
                  <span>
                    Review your shipping, delivery and payment information
                  </span>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="my-3" md={6} lg={6}>
                    <Card className="detail">
                      <h1 className=" py-2 d-flex flex-row align-items-lg-start">
                        <MdLocationPin className="icon" /> Shipping Destination
                      </h1>
                      <h3>
                        <MdPerson /> {address.recipient_name}
                      </h3>
                      <div className="d-flex justify-content-start gap-1 align-content-center">
                        <FaMap className="icon" />
                        <div className="">
                          <span> {address.address_1}</span>
                          <span>
                            {address.city}, {address.postal_code},
                          </span>
                          <span>
                            {address.state}, {address.country}
                          </span>
                        </div>
                      </div>
                      <span className="mt-2 d-flex flex-row align-items-center">
                        <MdPhone className="icon" />
                        {address.recipent_phone}
                      </span>
                    </Card>
                  </Col>
                  <Col className="my-3" md={6} lg={6}>
                    <Card className="detail">
                      <h1 className="py-2 d-flex flex-row align-items-lg-start">
                        <MdDeliveryDining className="icon" /> Shipping Method
                      </h1>
                      <span className="px-2">2-3 Business Days Delivery</span>
                      <span className="mt-5 d-flex flex-row align-items-lg-start">
                        <MdSecurity className="icon" />
                        Fully insured transit
                      </span>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="bg-white">
                <Card className="payment_detail mt-5">
                  <FaCcVisa className="icon" />
                  <div className="d-flex flex-column align-items-start">
                    <span>Visa ending in 4242</span>
                    <span>Billing address identical to shipping</span>
                  </div>
                  <span className="pay">Pay in full</span>
                </Card>
              </CardFooter>
            </Card>
          </Col>
          <Col className="my-3 my-lg-0" md={12} lg={5} xxl={6}>
            <Card className="total_payment">
              <CardHeader>
                <h1>
                  <FaCartArrowDown /> Total summary
                </h1>
              </CardHeader>
              <CardBody>
                <div className="d-flex flex-row justify-content-between my-3">
                  <span>Item Subtotal ({totalQty} books) : </span>
                  <span>RM {Number(subtotal).toFixed(2)}</span>
                </div>
                <div className="d-flex flex-row justify-content-between my-3">
                  <span>Discount Price : </span>
                  <span>RM {Number(discount).toFixed(2)}</span>
                </div>
                <div className="d-flex flex-row justify-content-between my-3">
                  <span>Shipping Fee : </span>
                  <span>RM {Number(shipping_price).toFixed(2)}</span>
                </div>
                <div className="d-flex flex-row justify-content-between my-3">
                  <span>Tax : </span>
                  <span>RM {Number(tax).toFixed(2)}</span>
                </div>
              </CardBody>
              <CardFooter>
                <div className="d-flex flex-row justify-content-between my-3">
                  <h1>Total : </h1>
                  <h1>RM {Number(grand_total).toFixed(2)}</h1>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col sm={12} md={12} lg={6}>
            <Button className="btn-secondary my-1 w-100" onClick={backOrder}>
              Back
            </Button>
          </Col>
          {status == "pending" ? (
            <Col sm={12} md={12} lg={6}>
              <Button
                className="btn-danger my-1 w-100"
                onClick={() => setConfrim(true)}
              >
                Cancel
              </Button>
            </Col>
          ) : (
            ""
          )}
        </Row>
      </div>
      <ConfrimMessage
        message={"Are you cancel this order"}
        show={confrim}
        submit={() => {
          setConfrim(false);
          CancelOrder(id);
        }}
        onHide={() => {
          setConfrim(false);
        }}
      />
      <DeleteStatus
        link={link}
        message={message}
        show={modal}
        onHide={() => {
          setModal(false);
        }}
      />
    </>
  );
}

OrderDetailOverview.propTypes = {
  id: PropTypes.number.isRequired,
  order_number: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  placed_at: PropTypes.string.isRequired,
  grand_total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shipping_price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  subtotal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  discount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  tax: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  order_items: PropTypes.arrayOf(
    PropTypes.shape({
      SKU: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      subtotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title_book: PropTypes.string.isRequired,
    }),
  ),
  address: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    recipient_name: PropTypes.string,
    recipent_phone: PropTypes.string.isRequired,
    address_1: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    postal_code: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    status: PropTypes.bool,
  }),
};

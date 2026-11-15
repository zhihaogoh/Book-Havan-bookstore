import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import Listing from "../../components/dashboard/listing";
import OrderListing from "../../components/dashboard/order_listing";
import { useEffect, useState } from "react";
import { getOrder } from "../../auth/auth";
import { useNavigate } from "react-router";

export default function ListOrder() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [order, setOrder] = useState([]);
  const backToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const response = await getOrder();
        if (!Array.isArray(response.orders)) {
          throw new Error("Orders error");
        }
        setOrder(response.orders);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadOrder();
  }, []);
  // console.log(order);
  if (loading) return <Spinner className="center" animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  return (
    <>
      <>
        <div className="container">
          <Row>
            <Col md={4} lg={3}>
              <Listing />
            </Col>
            <Col md={8} lg={9}>
              {order.length > 0 ? (
                <OrderListing order={order} />
              ) : (
                <div className="title d-flex flex-column justify-content-center align-items-center">
                  <h3>Not in your Order</h3>
                  <Button
                    className="btn-secondary py-2 px-5 m-3"
                    onClick={backToHome}
                  >
                    Back to home
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}

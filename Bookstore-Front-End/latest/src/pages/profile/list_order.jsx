import { Alert, Col, Row, Spinner } from "react-bootstrap";
import Listing from "../../components/dashboard/listing";
import OrderListing from "../../components/dashboard/order_listing";
import { useEffect, useState } from "react";
import { getOrder } from "../../auth/auth";

export default function ListOrder() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [order, setOrder] = useState([]);

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
  console.log(order);
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
              <OrderListing 
                order = {order}
              />
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}

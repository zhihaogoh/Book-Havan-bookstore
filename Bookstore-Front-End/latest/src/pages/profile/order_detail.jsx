import { Col, Row } from "react-bootstrap";
import Listing from "../../components/dashboard/listing";
import { useParams } from "react-router";

import OrderDetailOverview from "../../components/order_detail/order_detail_overview";
import { useEffect, useState } from "react";
import { getOrderId } from "../../auth/auth";


export default function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    setOrder(null);
    const fetchOrder = async () => {
      try {
        const response = await getOrderId(orderId);
        if (!response?.orders) {
          throw new Error("Order not found");
        }
        if (active) setOrder(response.orders);
      } catch (error) {
        console.error("Error fetching order:", error);
        if (active) setError("Unable to load this order. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchOrder();
    return () => {
      active = false;
    };
  },[orderId]);
  return (
    <>
      <>
        <div className="container">
          <Row>
            <Col md={4} lg={3}>
              <Listing />
            </Col>
            <Col md={8} lg={9}>
              {loading ? (
                <p role="status">Loading order...</p>
              ) : error ? (
                <p role="alert">{error}</p>
              ) : order && <OrderDetailOverview 
              
                order_number = {order.order_number}
                status = {order.status}
                placed_at = {order.placed_at}
                order_items={order.order_items}
                address = {order.user_address}
                shipping_price = {order.shipping_total}
                subtotal = {order.subtotal}
                grand_total={order.grand_total}
                discount={order.discount_total}
                tax = {order.tax_total}
              />}
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}

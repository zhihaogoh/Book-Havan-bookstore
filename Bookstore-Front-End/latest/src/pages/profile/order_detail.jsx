import { Col, Row } from "react-bootstrap";
import Listing from "../../components/dashboard/listing";
import { useParams } from "react-router";
import { order } from "../../data/products";
import OrderDetailOverview from "../../components/order_detail/order_detail_overview";

export default function OrderDetail(){
    const {orderId} = useParams();
    const orders = order.find((item) => String(item.id) === orderId); 
    return(
        <>
        <>
            <div className="container">
                 <Row>
            <Col md={4} lg={3}>
              <Listing />
            </Col>
            <Col md={8} lg={9}>
                <OrderDetailOverview 
                    order={orders}
                />
            </Col>
          </Row>
            </div>
        </>
        </>
    )
}
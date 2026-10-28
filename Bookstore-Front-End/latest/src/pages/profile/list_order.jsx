import { Col, Row } from "react-bootstrap";
import Listing from "../../components/dashboard/listing";
import OrderListing from "../../components/dashboard/order_listing";

export default function ListOrder(){
    return(
        <>
        <>
         <div className="container">
            <Row>
                <Col md={4} lg={3}>
                    <Listing />
                </Col>
                <Col md={8} lg={9}>
                    <OrderListing />
                </Col>
            </Row>
         </div>
        </>
        </>
    )
}
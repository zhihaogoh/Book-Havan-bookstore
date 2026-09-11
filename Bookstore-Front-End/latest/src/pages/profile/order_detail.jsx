import { Col, Row } from "react-bootstrap";
import Layout from "../../layout/Layout";
import Listing from "../../components/dashboard/listing";
import OrderDetialOverview from "../../components/order_detail/order_detail_overview";

export default function OrderDetial(){
    return(
        <>
        <Layout>
            <div className="container">
                 <Row>
            <Col md={4} lg={3}>
              <Listing />
            </Col>
            <Col md={8} lg={9}>
                <OrderDetialOverview />
            </Col>
          </Row>
            </div>
        </Layout>
        </>
    )
}
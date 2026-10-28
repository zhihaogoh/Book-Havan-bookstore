import { Col, Row } from "react-bootstrap";
import Listing from "../../components/dashboard/listing";
import AddressList from "../../components/dashboard/address_list";

export default function Address(){
    return(
        <>
        <>
            <div className="container">
          <Row>
            <Col md={4} lg={3} className="d-none d-md-block">
              <Listing />
            </Col>
            <Col md={8} lg={9}>
              <AddressList />
            </Col>
          </Row>
        </div>
        </>
        </>
    )
}
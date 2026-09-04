import { Col, Row } from "react-bootstrap";
import Layout from "../../layout/Layout";
import Listing from "../../components/dashboard/listing";

export default function ProfileFavourite() {
  return (
    <>
      <Layout>
        <div className="container">
          <Row>
            <Col md={4}>
              <Listing />
            </Col>
            <Col md={8}></Col>
          </Row>
        </div>
      </Layout>
    </>
  );
}

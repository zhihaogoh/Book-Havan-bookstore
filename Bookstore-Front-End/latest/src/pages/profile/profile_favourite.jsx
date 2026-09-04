import { Col, Row } from "react-bootstrap";
import Layout from "../../layout/Layout";
import Listing from "../../components/dashboard/listing";
import DashboardFavourite from "../../components/dashboard/dashboard_favoutrite";

export default function ProfileFavourite() {
  return (
    <>
      <Layout>
        <div className="container">
          <Row>
            <Col md={4} lg={3}>
              <Listing />
            </Col>
            <Col md={8} lg={9}>
                <DashboardFavourite />
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  );
}

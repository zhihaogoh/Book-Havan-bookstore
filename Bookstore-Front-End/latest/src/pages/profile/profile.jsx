import { Col, Row } from "react-bootstrap";
import ProfilePage from "../../components/dashboard/profile_page";
import Layout from "../../layout/Layout";
import Listing from "../../components/dashboard/listing";
import RecentOrder from "../../components/dashboard/recent_order";

export default function Profile() {
  return (
    <>
      <Layout>
        <div className="container">
          <Row>
            <Col md={3} lg={3} className="d-none d-md-block">
              <Listing />
            </Col>
            <Col md={9} lg={9}>
              <ProfilePage />
              <RecentOrder />
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  );
}

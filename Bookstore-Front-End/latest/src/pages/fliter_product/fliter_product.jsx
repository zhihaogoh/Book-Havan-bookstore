import { Col, Row } from "react-bootstrap";
import Fliter from "../../components/fliter/fliter";
import Layout from "../../layout/Layout";

export default function FliterProduct() {
  return (
    <>
      <Layout>
        <div className="fliter_product container">
          <Row>
            <Col xs={1} md={4} lg={4}>
              <Fliter 
                check_categories={[
                  {
                    category: "Fiction",
                  },
                  {
                    category: "Non Fiction",
                  },
                  {
                    category: "Business",
                  },
                ]}
                rating={[
                  {
                    rate: 5,
                  },
                  {
                    rate: 4.5,
                  },
                  {
                    rate: 4,
                  },
                  {
                    rate: 3.5,
                  },
                ]}
              />
            </Col>
            
          </Row>
        </div>
      </Layout>
    </>
  );
}

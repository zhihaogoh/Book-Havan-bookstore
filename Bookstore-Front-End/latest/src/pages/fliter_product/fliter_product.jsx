import { Col, Row } from "react-bootstrap";
import Fliter from "../../components/fliter/fliter";
import Layout from "../../layout/Layout";
import ProductResult from "../../components/product/product_result";

export default function FliterProduct() {
  return (
    <>
      <Layout>
        <div className="fliter_product container">
          <Row>
            <Col xs={0} md={4} lg={4}>
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
            <Col xs={0} md={8} lg={8}>
              <ProductResult
                products={[
                  {
                    id: 1,
                    BookName: "The Silent Patient",
                    Author: "Alex Michaelides",
                    Price: 15.99,
                    img: "../src/assets/Image/Product/Product6.jpg",
                    viewNumber: 1000,
                    star: 4.5,
                  },
                  {
                    id: 2,
                    BookName: "The Midnight Library",
                    Author: "Matt Haig",
                    Price: 14.99,
                    img: "../src/assets/Image/Product/Product5.jpg",
                    viewNumber: 800,
                    star: 4.3,
                  },
                  {
                    id: 3,
                    BookName: "The Vanishing Half",
                    Author: "Brit Bennett",
                    Price: 16.99,
                    img: "../src/assets/Image/Product/Product4.jpg",
                    viewNumber: 1200,
                    star: 4.7,
                  },
                  {
                    id: 4,
                    BookName: "The Four Winds",
                    Author: "Kristin Hannah",
                    Price: 17.99,
                    img: "../src/assets/Image/Product/Product3.jpg",
                    viewNumber: 900,
                    star: 4.6,
                  },
                  {
                    id: 5,
                    BookName: "The Night Circus",
                    Author: "Erin Morgenstern",
                    Price: 13.99,
                    img: "../src/assets/Image/Product/Product2.jpg",
                    viewNumber: 1100,
                    star: 4.4,
                  },
                  {
                    id: 6,
                    BookName: "The Seven Husbands of Evelyn Hugo",
                    Author: "Taylor Jenkins Reid",
                    Price: 14.99,
                    img: "../src/assets/Image/Product/Product1.jpg",
                    viewNumber: 1000,
                    star: 4.5,
                  },
                  {
                    id: 7,
                    BookName: "The Silent Patient",
                    Author: "Alex Michaelides",
                    Price: 8.0,
                    img: "../src/assets/Image/Product/Product6.jpg",
                    viewNumber: 1000,
                    star: 4.5,
                    discount: 10,
                  },
                  {
                    id: 8,
                    BookName: "The Midnight Library",
                    Author: "Matt Haig",
                    Price: 7.5,
                    img: "../src/assets/Image/Product/Product5.jpg",
                    viewNumber: 800,
                    star: 4.3,
                    discount: 15,
                  },
                  {
                    id: 9,
                    BookName: "The Vanishing Half",
                    Author: "Brit Bennett",
                    Price: 8.5,
                    img: "../src/assets/Image/Product/Product4.jpg",
                    viewNumber: 1200,
                    star: 4.7,
                    discount: 15,
                  },
                  {
                    id: 10,
                    BookName: "The Four Winds",
                    Author: "Kristin Hannah",
                    Price: 8.5,
                    img: "../src/assets/Image/Product/Product3.jpg",
                    viewNumber: 900,
                    star: 4.6,
                    discount: 15,
                  },
                  {
                    id: 11,
                    BookName: "The Night Circus",
                    Author: "Erin Morgenstern",
                    Price: 7.0,
                    img: "../src/assets/Image/Product/Product2.jpg",
                    viewNumber: 1100,
                    star: 4.4,
                    discount: 15,
                  },
                  {
                    id: 12,
                    BookName: "The Seven Husbands of Evelyn Hugo",
                    Author: "Taylor Jenkins Reid",
                    Price: 7.5,
                    img: "../src/assets/Image/Product/Product1.jpg",
                    viewNumber: 1000,
                    star: 4.5,
                    discount: 15,
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

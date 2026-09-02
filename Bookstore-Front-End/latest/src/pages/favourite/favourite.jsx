import { Col, Row } from "react-bootstrap";
import { products } from "../../data/products";
import Layout from "../../layout/Layout";
import CardProduct from "../../components/card_product/card_product";

export default function Favoutite() {
  const product = products;
  return (
    <>
     <Layout>
        <div className="container">
            <div className="title">
                <h3>Your Wishlist</h3>
                <p>Curated selections awaiting your library.</p>
            </div>
      <Row>
        {product.map((item,index) => (
          <Col className="p-3" xs={6} md={4} lg={4} key={index}>
            <CardProduct product={item} />
          </Col>
        ))}
      </Row>
    </div>
     </Layout>
      
    </>
   
  
  );
}

import { Col, Form, Row } from "react-bootstrap";
import CardProduct from "../card_product/card_product";
import { useEffect, useState } from "react";
import { getWishlist } from "../../auth/auth";

export default function DashboardFavourite() {
   const [products, setProducts] = useState([]);
   useEffect(() => {
     const fetchProducts = async () => {
       try{
         const response = await getWishlist();
         // console.log("Books fetched successfully:", response);
         if (!Array.isArray(response.data)) {
           throw new Error("Books API response.data must be an array");
         }
         setProducts(response.data);
       } catch (error) {
         console.error("Error fetching books:", error);
       }
     };
     fetchProducts();
   }, [])
  return (
    <>
      <div className="dashboard_favourite">
        <div className="title py-3">
          <h3>Wishlist</h3>
          <span>
            Your curated collection of titles waiting to be explored. Books
            saved here will remain until you choose to purchase or remove them.
          </span>
        </div>
        <div className="result_favourite">
          <span>{products.length} items saved</span>
          <div className="sort">
            <span className="pe-3">Sort By : </span>
            <Form>
              <Form.Group controlId="formGridState">
                <Form.Select defaultValue="Most Popular">
                  <option>Most Popular</option>
                  <option>Default</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </div>
        </div>
              <Row>
        {products.map((item) => (
          <Col className="p-3" xs={6} md={6} lg={4} key={item.id}>
            <CardProduct product={item.book} wishlistItemId={item.id} favourite = {true} />
          </Col>
        ))}
      </Row>
      </div>
    </>
  );
}

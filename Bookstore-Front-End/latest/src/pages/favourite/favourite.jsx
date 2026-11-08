import { Col, Row } from "react-bootstrap";
import CardProduct from "../../components/card_product/card_product";
import { useEffect, useState } from "react";
import { getWishlist } from "../../auth/auth";

export default function Favoutite() {
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
  }, []);
  return (
    <>
     <>
        <div className="container">
            <div className="title">
                <h3>Your Wishlist</h3>
                <p>Curated selections awaiting your library.</p>
            </div>
      <Row>
        {products.map((item) => (
          <Col className="p-3" xs={6} md={4} lg={3} key={item.id}>
            <CardProduct 
            product={item.book} 
            wishlistItemId={item.id}
            favourite = {true} />
          </Col>
        ))}
      </Row>
    </div>
     </>
      
    </>
   
  
  );
}

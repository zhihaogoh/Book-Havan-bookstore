import { useParams } from "react-router";
import ProductDetails from "../../components/product_detail/product_details";
import { useEffect, useState } from "react";
import { getBookById } from "../../auth/auth";

export default function ProductDetail() {
  const { productId } = useParams();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getBookById(productId);
        setProduct(response.book);
        // console.log("Fetched product  :", response.book);
      } catch (error) {
        console.error("Error fetching products:", error);
      } 
    }
    fetchProducts();
  }, [productId]);
  
  const [product, setProduct] = useState(null);
  // const product = products.find((item) => String(item.id) === productId);

  if (!product) {
    return (
      <>
        <h2>Product Not Found</h2>
      </>
    );
  }
  return (
    <>
      <>
        <div className="container">
          <ProductDetails product={product}
              img = {"../src/assets/Image/Product/Product1.jpg"}
          />
        </div>
      </>
    </>
  );
}

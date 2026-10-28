import { useParams } from "react-router";
import { products } from "../../data/products";
import ProductDetails from "../../components/product_detail/product_details";

export default function ProductDetail() {
  const { productId } = useParams();
  const product = products.find((item) => String(item.id) === productId);
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
          <ProductDetails product={product} />
        </div>
      </>
    </>
  );
}

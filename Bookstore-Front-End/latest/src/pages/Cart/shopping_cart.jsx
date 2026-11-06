import { useEffect, useState } from "react";
import ShoppingCarts from "../../components/shopping_cart/shopping_carts";
// import { cart } from "../../data/products";
import { getCart } from "../../auth/auth";
import { Alert, Spinner } from "react-bootstrap";

export default function ShoppingCart() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [carts, setCart] = useState([]);
  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await getCart();
        if (!Array.isArray(response.data)) {
          throw new Error("Carts error");
        }
        setCart(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);
  console.log(carts);
  //   const ShoppingCart = cart;

  if (loading) return <Spinner className="center" animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      <>
        <div className="container">
          <ShoppingCarts carts={carts} />
        </div>
      </>
    </>
  );
}

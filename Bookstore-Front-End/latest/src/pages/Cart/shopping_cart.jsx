import ShoppingCarts from "../../components/shopping_cart/shopping_carts";
import { cart } from "../../data/products"
import Layout from "../../layout/Layout";

export default function ShoppingCart(){
    const ShoppingCart = cart;
    return(
        <>
        <Layout>
            <div className="container">
                <ShoppingCarts 
                    carts = {ShoppingCart} />
            </div>
        </Layout>
        </>
    )
}
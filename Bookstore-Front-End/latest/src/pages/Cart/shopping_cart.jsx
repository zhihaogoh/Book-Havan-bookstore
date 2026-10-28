import ShoppingCarts from "../../components/shopping_cart/shopping_carts";
import { cart } from "../../data/products"

export default function ShoppingCart(){
    const ShoppingCart = cart;
    return(
        <>
        <>
            <div className="container">
                <ShoppingCarts 
                    carts = {ShoppingCart} />
            </div>
        </>
        </>
    )
}
import { useParams } from "react-router";
import Layout from "../../layout/Layout";
import { products } from "../../data/products";

export default function ProductDetail(){
    const {productId} = useParams();
    const product = products.find(
        (item) => String(item.id) === productId
    );
    if(!product){
        return (
            <Layout>
                <h2>Product Not Found</h2>
            </Layout>
        )
    }
    return(
        <>
        <Layout>
         
        </Layout>
        </>
    )
}
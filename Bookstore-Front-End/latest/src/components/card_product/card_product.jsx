import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { MdFavorite } from "react-icons/md";
// import StarRating from "../star_rating/star_rating";

export default function CardProduct({ product,favourite }) {
  const price = Number(product.book_price);
  const discount = price * (1 - (product.discount_percentage ?? 0) / 100);
  return (
    <>
      <Link
        to={`/product_detail/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card className="card-product">
          <div className="discount_img">
            
            <img src={product.img ? product.img : "../src/assets/image/Product/Product1.jpg"} className="product_img" />
            {product.discount_percentage > 0 && <span>-{product.discount_percentage}%</span>}
            {favourite === true && <MdFavorite className="favourite" />}
          </div>
          <h3 className="book-name">{product.book_name}</h3>
          <p className="author">{product.author?.author_name  }</p>
          {/* <StarRating rating={product.star} reviewCount={product.viewNumber} /> */}
          <div className="price-cart">
            {product.discount_percentage > 0 ?(
              <>
            <p className="price text-danger fw-bold">RM{discount.toFixed(2)}</p>
            <p className="price_del"><del>RM{price.toFixed(2)}</del></p> 
              </>
              ):(
               <p className="price">RM{price.toFixed(2)}</p> 

              )}
          </div>
        </Card>
      </Link>
      
    </>
  );
}

CardProduct.propTypes = {
  product: PropTypes.shape({
        id: PropTypes.number.isRequired,
       img: PropTypes.string.isRequired,
       book_name: PropTypes.string.isRequired,
       author: PropTypes.shape({
         author_name: PropTypes.string.isRequired,
       }).isRequired,
       // star: PropTypes.number.isRequired,
       // viewNumber: PropTypes.number.isRequired,
       book_price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
       discount_percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
     }).isRequired,
  favourite: PropTypes.bool
};


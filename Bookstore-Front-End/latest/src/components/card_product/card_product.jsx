import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { MdFavorite } from "react-icons/md";
import StarRating from "../star_rating/star_rating";

export default function CardProduct({ product,favourite }) {
  const discount =product.Price * (1-product.discount/100);
  
  return (
    <>
      <Link
        to={`/product_detail/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card className="card-product">
          <div className="discount_img">
            <img src={product.img} className="product_img" />
            {product.discount > 0 && <span>-{product.discount}%</span>}
            {favourite === true && <MdFavorite className="favourite" />}
          </div>
          <h3 className="book-name">{product.BookName}</h3>
          <p className="author">{product.Author}</p>
          <StarRating rating={product.star} reviewCount={product.viewNumber} />
          <div className="price-cart">
            {product.discount ?(
              <>
            <p className="price text-danger fw-bold">RM{discount.toFixed(2)}</p>
            <p className="price_del"><del>RM{product.Price.toFixed(2)}</del></p> 
              </>
              ):(
               <p className="price">RM{product.Price.toFixed(2)}</p> 

              )
                          }
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
    BookName: PropTypes.string.isRequired,
    Author: PropTypes.string.isRequired,
    star: PropTypes.number.isRequired,
    viewNumber: PropTypes.number.isRequired,
    Price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    categoty: PropTypes.string,
  }).isRequired,
  favourite: PropTypes.bool
};

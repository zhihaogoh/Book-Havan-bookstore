import { Card } from "react-bootstrap";
import { MdShoppingCart } from "react-icons/md";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import PropTypes from "prop-types";

function StarRating({ rating = 0, reviewCount = 0 }) {
  const normalizedRating =
    Math.round(Math.min(5, Math.max(0, rating)) * 2) / 2;

  return (
    <div
      className="rating"
      aria-label={`${normalizedRating} out of 5 stars, ${reviewCount} reviews`}
    >
      <div className="stars" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((position) => {
          if (normalizedRating >= position) {
            return <FaStar key={position} />;
          }

          if (normalizedRating >= position - 0.5) {
            return <FaStarHalfAlt key={position} />; //  <0.5
          }

          return <FaRegStar key={position} />;
        })}
      </div>
      <span className="review-count">({reviewCount.toLocaleString()})</span>
    </div>      
  );
}

StarRating.propTypes = {
  rating: PropTypes.number,
  reviewCount: PropTypes.number,
};

export default function CardProduct({ product }) {
  return (
    <>
      <Card className="card-product">
        <img src={product.img} className="product_img" />
        <h3 className="book-name">{product.BookName}</h3>
        <p className="author">{product.Author}</p>
        <StarRating rating={product.star} reviewCount={product.viewNumber} />
        <div className="price-cart">
          <p className="price">RM{product.Price}</p>
          <MdShoppingCart />
        </div>
      </Card>
    </>
  );
}

CardProduct.propTypes = {
  product: PropTypes.shape({
    img: PropTypes.string.isRequired,
    BookName: PropTypes.string.isRequired,
    Author: PropTypes.string.isRequired,
    star: PropTypes.number.isRequired,
    viewNumber: PropTypes.number.isRequired,
    Price: PropTypes.number.isRequired,
  }).isRequired,
};

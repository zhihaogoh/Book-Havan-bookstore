import PropTypes from "prop-types";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function StarRating({ rating, reviewCount }) {
  const normalizedRating = Math.round(Math.min(5, Math.max(0, rating)) * 2) / 2;
  const count = [1, 2, 3, 4, 5];
  return (
    <div
      className="rating"
      aria-label={`${normalizedRating} out of 5 stars, ${reviewCount} reviews`}
    >
      <div className="stars" aria-hidden="true">
        {count.map((position) => {
          if (normalizedRating >= position) {
            return <FaStar key={position} />;
          }

          if (normalizedRating >= position - 0.5) {
            return <FaStarHalfAlt key={position} />;
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
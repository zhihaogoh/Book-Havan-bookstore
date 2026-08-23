import CardProduct from "../card_product/card_product";
import PropTypes from "prop-types";
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';


export default function ListProduct({ title, viewAllLink, products }) {
  return (
    <>
      <div className="list_product container">
        <div className="title">
          <h3>{title}</h3>
          <a href={viewAllLink}>{viewAllLink}</a>
        </div>
        <Swiper
          className="banner_product p-3"
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 8 },
            768: { slidesPerView: 3, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          navigation={true}
          modules={[Navigation]}
        >
          {products.map((item, index) => (
            <SwiperSlide key={index}>
              <CardProduct product={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

ListProduct.propTypes = {
  title: PropTypes.string.isRequired,
  viewAllLink: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      BookName: PropTypes.string.isRequired,
      Author: PropTypes.string.isRequired,
      star: PropTypes.number.isRequired,
      viewNumber: PropTypes.number.isRequired,
      Price: PropTypes.number.isRequired,
      discount: PropTypes.number
    })
  ).isRequired,
};

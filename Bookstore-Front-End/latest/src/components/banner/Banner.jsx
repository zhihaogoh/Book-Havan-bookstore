import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Pagination, Mousewheel, Navigation } from "swiper/modules";
import PropTypes from "prop-types";
export default function Banner({ banner }) {
  return (
    <>
      <div className="container">
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          {banner.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item.img} className="banner" alt="banner{index}" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
Banner.propTypes = {
  banner: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
    }),
  ),
};

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Pagination, Mousewheel, Navigation } from "swiper/modules";
export default function Banner() {
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
        <SwiperSlide>                        
            <img src="../src/assets/image/banner_1.png" className='banner' alt='banner{index}' />
        </SwiperSlide>
        <SwiperSlide>                        
            <img src="../src/assets/image/banner_2.png" className='banner' alt='banner{index}' />
        </SwiperSlide>
         <SwiperSlide>                        
            <img src="../src/assets/image/banner_3.png" className='banner' alt='banner{index}' />
        </SwiperSlide>
      </Swiper>
      </div>
    </>
  );
}

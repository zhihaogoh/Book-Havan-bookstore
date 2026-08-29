import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { MdCheckCircle, MdOutlineFavorite } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
export default function ProductDetails({ product }) {
  const [num, setNumber] = useState(1);
  return (
    <>
      <div className="product_detail">
        <Row>
          <Col sm={12} md={6} lg={6}>
            <div className="image_group">
              <div className="main_img">
                <img src={product.img} alt={product.img} />
              </div>
              <Swiper
                slidesPerView={4}
                grid={{
                  rows: 1,
                }}
                spaceBetween={5}
                modules={[Grid, Pagination]}
                className="swiper_img"
              >
                <SwiperSlide>
                  <img src={product.img} alt={product.img} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={product.img} alt={product.img} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={product.img} alt={product.img} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={product.img} alt={product.img} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={product.img} alt={product.img} />
                </SwiperSlide>
              </Swiper>
            </div>
          </Col>

          <Col sm={12} md={6} lg={6}>
            <div className="pt-3 product_detail_content">
              <div className="title_books">
                <h3>{product.BookName}</h3>
              </div>
              <div className="author">
                <span>
                  by <span>{product.Author}</span>
                </span>
              </div>
              <div className="price_cart mt-5 p-3">
                <span>RM{product.Price}</span>
                <div className="stock">
                  {product.stock === true ? (
                    <span className="true">
                      <MdCheckCircle /> In Stock • Ships within 24hrs
                    </span>
                  ) : (
                    <span className="false">No Stock</span>
                  )}
                </div>
                <div className="qty_cart p-2">
                  <Row>
                    <Col className="p-1" sm={2} md={4} lg={4}>
                      <div className="buttom_add_max">
                        <Button
                          className="btn-light"
                          onClick={() => setNumber(num - 1)}
                          disabled={num <= 1}
                        >
                          -
                        </Button>
                        <input type="number" className="number" value={num} />
                        <Button
                          className="btn-light"
                          onClick={() => setNumber(num + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                    <Col className="p-1" sm={2} md={6} lg={6}>
                      <Button className="cart">
                        <FaShoppingCart /> Add to Cart
                      </Button>
                    </Col>
                    <Col className="p-1" sm={2} md={2} lg={2}>
                      <Button className="favourite">
                        <MdOutlineFavorite />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="product_description">
                <h3>Synopsis</h3>
                <p>
                  Alicia Berenson’s life is seemingly perfect. A famous painter
                  married to an in-demand fashion photographer, she lives in a
                  grand house with big windows overlooking a park in one of
                  London’s most desirable areas. One evening her husband Gabriel
                  returns home late from a fashion shoot, and Alicia shoots him
                  five times in the face, and then never speaks another word.
                  Alicia’s refusal to talk, or give any kind of explanation,
                  turns a domestic tragedy into something far grander, a mystery
                  that captures the public imagination and casts Alicia into
                  notoriety. The price of her art skyrockets, and she, the
                  silent patient, is hidden away from the tabloids and spotlight
                  at the Grove, a secure forensic unit in North London.
                </p>
                <span>Read More</span>
              </div>
              <div className="spec">
                <Row>
                  <Col sm={4} md={6} lg={3}>
                    <div className="spec_detail">
                      <h3>Format</h3>
                      <span>Hardcover</span>
                    </div>
                  </Col>
                  <Col sm={4} md={6} lg={3}>
                    <div className="spec_detail">
                      <h3>Pages</h3>
                      <span>336</span>
                    </div>
                  </Col>
                  <Col sm={4} md={6} lg={3}>
                    <div className="spec_detail">
                      <h3>Publisher</h3>
                      <span>Celadon Books</span>
                    </div>
                  </Col>
                  <Col sm={4} md={6} lg={3}>
                    <div className="spec_detail">
                      <h3>ISBN</h3>
                      <span>9781250301697</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    img: PropTypes.string.isRequired,
    BookName: PropTypes.string.isRequired,
    Author: PropTypes.string.isRequired,
    star: PropTypes.number.isRequired,
    viewNumber: PropTypes.number.isRequired,
    Price: PropTypes.number.isRequired,
    discount: PropTypes.number,
    categoty: PropTypes.string,
    stock: PropTypes.bool,
  }).isRequired,
};

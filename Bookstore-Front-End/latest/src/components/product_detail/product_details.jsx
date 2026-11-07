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
import SuccessStatus from "../Modal/success_status";
import { addCart } from "../../auth/auth";

export default function ProductDetails({ product, img }) {
  const [num, setNumber] = useState(1);
  const [modal, setModal] = useState(false);
  const price = Number(product.book_price) * num;
  const discount = price * (1 - (product.discount_percentage ?? 0) / 100);
  const updateQuantity = (change) => {
    setNumber((currentQuantity) => Math.max(1, currentQuantity + change));
  };
  const handleAddCart = async (id, quantity) => {
    try {
      const response = await addCart(id, quantity);
      if (response) {
        setModal(true);
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="product_detail">
        <Row>
          <Col sm={12} md={6} lg={6}>
            <div className="image_group">
              <div className="main_img">
                <img src={img} alt={img} />
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
                  <img src={img} alt={img} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img} alt={img} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img} alt={img} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img} alt={img} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img} alt={img} />
                </SwiperSlide>
              </Swiper>
            </div>
          </Col>

          <Col sm={12} md={6} lg={6}>
            <div className="pt-3 product_detail_content">
              <div className="title_books">
                <h3>{product.book_name}</h3>
              </div>
              <div className="author">
                <span>
                  by <span>{product.author?.author_name}</span>
                </span>
              </div>
              <div className="price_cart mt-5 p-3">
                {product.discount_percentage > 0 ? (
                  <span>
                    <p className="price text-danger fw-bold">
                      RM{discount.toFixed(2)}
                    </p>
                    <p className="price_del">
                      <del>RM{price.toFixed(2)}</del>
                    </p>
                  </span>
                ) : (
                  <span>RM{price.toFixed(2)}</span>
                )}

                <div className="stock">
                  {product.status === 1 ? (
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
                          onClick={() => updateQuantity(-1)}
                          disabled={num <= 1}
                        >
                          -
                        </Button>
                        <input
                          type="number"
                          className="number"
                          value={num}
                          readOnly
                        />
                        <Button
                          className="btn-light"
                          onClick={() => updateQuantity(1)}
                          disabled={
                            product.status === 0 ||
                            num >= Number(product.book_quantity)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                    <Col className="p-1" sm={2} md={6} lg={6}>
                      <Button
                        className="cart"
                        disabled={product.status === 0}
                        onClick={() => {
                          handleAddCart(product.id, num);
                        }}
                      >
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
                <p>{product.book_description}</p>
                <span>Read More</span>
              </div>
              <div className="spec">
                <Row>
                  <Col sm={4} md={6} lg={3}>
                    <div className="spec_detail">
                      <h3>Category</h3>
                      <span>{product.category.categories_name}</span>
                    </div>
                  </Col>
                  <Col sm={4} md={6} lg={3}>
                    <div className="spec_detail">
                      <h3>Pages</h3>
                      <span>{product.book_pages}</span>
                    </div>
                  </Col>
                  <Col sm={4} md={6} lg={3}>
                    <div className="spec_detail">
                      <h3>Publisher</h3>
                      <span>{product.book_publisher}</span>
                    </div>
                  </Col>
                  <Col sm={4} md={6} lg={3}>
                    <div className="spec_detail">
                      <h3>ISBN</h3>
                      <span>{product.book_isbn}</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
        <SuccessStatus
          show={modal}
          img={img}
          product={product}
          number={num}
          onHide={() => {
            setModal(false);
          }}
        />
      </div>
    </>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,

    book_name: PropTypes.string.isRequired,
    author: PropTypes.shape({
      author_name: PropTypes.string.isRequired,
    }).isRequired,
    book_description: PropTypes.string.isRequired,
    book_publisher: PropTypes.string.isRequired,
    book_language: PropTypes.string.isRequired,
    book_pages: PropTypes.string.isRequired,
    book_isbn: PropTypes.string.isRequired,
    book_quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    // star: PropTypes.number.isRequired,
    // viewNumber: PropTypes.number.isRequired,
    book_price: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    discount_percentage: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    category: PropTypes.shape({
      categories_name: PropTypes.string.isRequired,
    }).isRequired,
    status: PropTypes.number,
  }).isRequired,
  img: PropTypes.string.isRequired,
};

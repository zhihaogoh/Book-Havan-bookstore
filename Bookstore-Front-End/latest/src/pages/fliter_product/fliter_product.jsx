import { Col, Row } from "react-bootstrap";
import Fliter from "../../components/fliter/fliter";
import Layout from "../../layout/Layout";
import ProductResult from "../../components/product/product_result";
import { useState } from "react";

const products = [
  {
    id: 1,
    BookName: "The Silent Patient",
    Author: "Alex Michaelides",
    Price: 15.99,
    img: "../src/assets/Image/Product/Product6.jpg",
    viewNumber: 1000,
    star: 4.5,
    category: "Fiction",
    stock: true,
  },
  {
    id: 2,
    BookName: "The Midnight Library",
    Author: "Matt Haig",
    Price: 14.99,
    img: "../src/assets/Image/Product/Product5.jpg",
    viewNumber: 800,
    star: 4.3,
    category: "Non Fiction",
    stock: true,
  },
  {
    id: 3,
    BookName: "The Vanishing Half",
    Author: "Brit Bennett",
    Price: 16.99,
    img: "../src/assets/Image/Product/Product4.jpg",
    viewNumber: 1200,
    star: 4.7,
    category: "Non Fiction",
    stock: true,
  },
  {
    id: 4,
    BookName: "The Four Winds",
    Author: "Kristin Hannah",
    Price: 17.99,
    img: "../src/assets/Image/Product/Product3.jpg",
    viewNumber: 900,
    star: 4.6,
    category: "Business",
    stock: true,
  },
  {
    id: 5,
    BookName: "The Night Circus",
    Author: "Erin Morgenstern",
    Price: 13.99,
    img: "../src/assets/Image/Product/Product2.jpg",
    viewNumber: 1100,
    star: 4.4,
    category: "Business",
    stock: true,
  },
  {
    id: 6,
    BookName: "The Seven Husbands of Evelyn Hugo",
    Author: "Taylor Jenkins Reid",
    Price: 14.99,
    img: "../src/assets/Image/Product/Product1.jpg",
    viewNumber: 1000,
    star: 4.5,
    category: "Scinece & Tech",
    stock: true,
  },
  {
    id: 7,
    BookName: "The Silent Patient",
    Author: "Alex Michaelides",
    Price: 8.0,
    img: "../src/assets/Image/Product/Product6.jpg",
    viewNumber: 1000,
    star: 4.5,
    discount: 10,
    category: "Scinece & Tech",
    stock: true,
  },
  {
    id: 8,
    BookName: "The Midnight Library",
    Author: "Matt Haig",
    Price: 7.5,
    img: "../src/assets/Image/Product/Product5.jpg",
    viewNumber: 800,
    star: 4.3,
    discount: 15,
    category: "Scinece & Tech",
    stock: true,
  },
  {
    id: 9,
    BookName: "The Vanishing Half",
    Author: "Brit Bennett",
    Price: 8.5,
    img: "../src/assets/Image/Product/Product4.jpg",
    viewNumber: 1200,
    star: 4.7,
    discount: 15,
    category: "Romance",
    stock: true,
  },
  {
    id: 10,
    BookName: "The Four Winds",
    Author: "Kristin Hannah",
    Price: 8.5,
    img: "../src/assets/Image/Product/Product3.jpg",
    viewNumber: 900,
    star: 4.6,
    discount: 15,
    category: "Romance",
    stock: true,
  },
  {
    id: 11,
    BookName: "The Night Circus",
    Author: "Erin Morgenstern",
    Price: 7.0,
    img: "../src/assets/Image/Product/Product2.jpg",
    viewNumber: 1100,
    star: 4.4,
    discount: 15,
    category: "Romance",
    stock: true,
  },
  {
    id: 12,
    BookName: "The Seven Husbands of Evelyn Hugo",
    Author: "Taylor Jenkins Reid",
    Price: 7.5,
    img: "../src/assets/Image/Product/Product1.jpg",
    viewNumber: 1000,
    star: 4.5,
    discount: 15,
    category: "Non Fiction",
    stock: false,
  },
];

export default function FliterProduct() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  //交互categories start
  const handleCategoryChange = (category) => {
    setSelectedCategories((currentCategories) =>
      currentCategories.includes(category)
        ? currentCategories.filter((item) => item !== category)
        : [...currentCategories, category],
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesMinPrice =
      minPrice === "" || product.Price >= Number(minPrice);
    const matchesMaxPrice =
      maxPrice === "" || product.Price <= Number(maxPrice);
    const matchesStock = !inStockOnly || product.stock;

    return (
      matchesCategory && matchesMinPrice && matchesMaxPrice && matchesStock
    );
  });

  const handleClearAll = () => {
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
  };
  //交互categories end
  return (
    <>
      <Layout>
        <div className="fliter_product container">
          <Row>
            <Col xs={0} md={4} lg={4}>
              <Fliter
                selectedCategories={selectedCategories}
                minPrice={minPrice}
                maxPrice={maxPrice}
                inStockOnly={inStockOnly}
                onCategoryChange={handleCategoryChange}
                onMinPriceChange={setMinPrice}
                onMaxPriceChange={setMaxPrice}
                onStockChange={setInStockOnly}
                onClearAll={handleClearAll}
                check_categories={[
                  {
                    category: "Fiction",
                  },
                  {
                    category: "Non Fiction",
                  },
                  {
                    category: "Business",
                  },
                  {
                    category: "Scinece & Tech",
                  },
                  {
                    category: "Romance",
                  },
                ]}
                rating={[
                  {
                    rate: 5,
                  },
                  {
                    rate: 4.5,
                  },
                  {
                    rate: 4,
                  },
                  {
                    rate: 3.5,
                  },
                ]}
              />
            </Col>
            <Col xs={0} md={8} lg={8}>
              <ProductResult
                products={filteredProducts}
                selectedCategories={selectedCategories}
              />
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  );
}

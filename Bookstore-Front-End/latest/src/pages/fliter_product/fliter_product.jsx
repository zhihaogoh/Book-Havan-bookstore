import { Col, Row } from "react-bootstrap";
import Fliter from "../../components/fliter/fliter";
import Layout from "../../layout/Layout";
import ProductResult from "../../components/product/product_result";
import { useState } from "react";
import { products } from "../../data/products";



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
    //交互categories end

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category); //选择一个以上的书类
    const matchesMinPrice =
      minPrice === "" || product.Price >= Number(minPrice); //设置至少的价钱
    const matchesMaxPrice =
      maxPrice === "" || product.Price <= Number(maxPrice);//设置至多的价钱
    const matchesStock = !inStockOnly || product.stock; // 设置佣有货

    return (
      matchesCategory && matchesMinPrice && matchesMaxPrice && matchesStock 
    );
  });

  //清除所有
  const handleClearAll = () => {
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
  };

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

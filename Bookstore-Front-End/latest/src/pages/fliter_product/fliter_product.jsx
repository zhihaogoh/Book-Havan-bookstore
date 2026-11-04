import { Col, Row } from "react-bootstrap";
import Fliter from "../../components/fliter/fliter";
import ProductResult from "../../components/product/product_result";
import { useEffect, useState } from "react";

import { useSearchParams } from "react-router";
import { getBook, getCategory } from "../../auth/auth";

export default function FliterProduct() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchParams] = useSearchParams();
  const keyword = (searchParams.get("q") ?? "").trim().toLowerCase();
  const [products, setProducts] = useState([]);
  const [checkCategories, setCheckCategories] = useState([]);
  //交互categories start
  const handleCategoryChange = (category) => {
    setSelectedCategories((currentCategories) =>
      currentCategories.includes(category)
        ? currentCategories.filter((item) => item !== category)
        : [...currentCategories, category],
    );
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const response = await getBook(currentPage);
        // console.log("Books fetched successfully:", response);
        if (!Array.isArray(response.data)) {
          throw new Error("Books API response.data must be an array");
        }
        setProducts(response.data);
        setLastPage(response.meta.last_page);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        // console.log("Categories fetched successfully:", response);

        setCheckCategories(response);

      }
      catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchProducts();
    fetchCategories();
  }, [currentPage]);

  //交互categories end
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category.categories_name); //选择一个以上的书类
    const matchesMinPrice =
      minPrice === "" || product.book_price >= Number(minPrice); //设置至少的价钱
    const matchesMaxPrice =
      maxPrice === "" || product.book_price <= Number(maxPrice); //设置至多的价钱
    const matchesStock = !inStockOnly || product.status === 1; // 设置佣有货
    const matchSearch =
      keyword === "" ||
      product.book_name.toLowerCase().includes(keyword) ||
      product.author.author_name.toLowerCase().includes(keyword);

    return (
      matchSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesStock
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
      <>
        <div className="fliter_product container">
          <Row>
            <Col xs={0} md={4} lg={3}>
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
                categories={checkCategories}
              />
            </Col>
            <Col xs={0} md={8} lg={9}>
              <ProductResult
                products={filteredProducts}
                selectedCategories={selectedCategories}
                keyword={keyword}
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={setCurrentPage}
              />
            </Col>
          </Row>
        </div>
      </>
    </>
  );
}

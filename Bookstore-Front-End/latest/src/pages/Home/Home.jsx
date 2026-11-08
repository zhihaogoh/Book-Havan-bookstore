import Banner from "../../components/banner/Banner";
import ListProduct from "../../components/list_product/list_product";
import Categories from "../../components/categories/Categories";
import ServiceList from "../../components/service/service_list";
import { useEffect, useState } from "react";
import { getBook } from "../../auth/auth";

export default function Home() {
  const [product, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const response = await getBook();
        // console.log("Books fetched successfully:", response);
        if (!Array.isArray(response.data)) {
          throw new Error("Books API response.data must be an array");
        }
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchProducts();
  }, []);
  // console.log("Products in Home component:", product);
  return (
    <>
      <>
        <Banner
          banner={[
            {
              img: "../src/assets/image/banner_1.png",
            },
            {
              img: "../src/assets/image/banner_2.png",
            },
            {
              img: "../src/assets/image/banner_3.png",
            },
          ]}
        />
        <ServiceList 
          
        
        />
        <Categories
          categories={[
            {
              icon: "../src/assets/Image/Icon/open-book.png",
              category: "Fiction",
              books_number: 400,
            },
            {
              icon: "../src/assets/Image/Icon/spell-book.png",
              category: "Non Fiction",
              books_number: 450,
            },
            {
              icon: "../src/assets/Image/Icon/briefcase.png",
              category: "Business",
              books_number: 650,
            },
            {
              icon: "../src/assets/Image/Icon/test.png",
              category: "Scinece & Tech",
              books_number: 550,
            },
            {
              icon: "../src/assets/Image/Icon/hearts.png",
              category: "Romance",
              books_number: 550,
            },
            {
              icon: "../src/assets/Image/Icon/categories.png",
              category: "More",
            },
          ]}
        />
        {/* New Arrivals  Starts*/}
        <ListProduct
          title="New Arrivals"
          viewAllLink="All Link"
          products={product}
        />
        {/* New Arrivals  Ends*/}
        {/* Discount Starts*/}
        <ListProduct
          title="Discounted Items"
          viewAllLink="All Link"
          products={product.filter((item) => item.discount_percentage > 0)}
        />
       
        {/* Discount Ends*/}
      </>
    </>
  );
}

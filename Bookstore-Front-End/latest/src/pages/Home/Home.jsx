import Banner from "../../components/banner/Banner";
import ListProduct from "../../components/list_product/list_product";
import Categories from "../../components/categories/Categories";
import ServiceList from "../../components/service/service_list";
import Layout from "../../layout/Layout";

export default function Home() {
  return (
    <>
      <Layout>
        <Banner />
        <ServiceList />
        <Categories 
          categories = {[
            {
              icon: "../src/assets/Image/Icon/open-book.png",
              category : "Fiction",
              books_number : 400 
            },
            {
              icon: "../src/assets/Image/Icon/spell-book.png",
              category : "Non Fiction",
              books_number : 450 
            },
            {
              icon: "../src/assets/Image/Icon/briefcase.png",
              category : "Business",
              books_number : 650
            },
            {
              icon: "../src/assets/Image/Icon/test.png",
              category : "Scinece & Tech",
              books_number : 550
            },
            {
              icon: "../src/assets/Image/Icon/hearts.png",
              category : "Romance",
              books_number : 550
            },
            {
              icon: "../src/assets/Image/Icon/categories.png",
              category : "More",
              
            }
          ]}
        />
        {/* New Arrivals  Starts*/}
        <ListProduct
          title="New Arrivals"
          viewAllLink="All Link"
          products={[
            {
              BookName: "The Silent Patient",
              Author: "Alex Michaelides",
              Price: 15.99,
              img: "../src/assets/Image/Product/Product6.jpg",
              viewNumber: 1000,
              star: 4.5,
            },
            {
              BookName: "The Midnight Library",
              Author: "Matt Haig",
              Price: 14.99,
              img: "../src/assets/Image/Product/Product5.jpg",
              viewNumber: 800,
              star: 4.3,
            },
            {
              BookName: "The Vanishing Half",
              Author: "Brit Bennett",
              Price: 16.99,
              img: "../src/assets/Image/Product/Product4.jpg",
              viewNumber: 1200,
              star: 4.7,
            },
            {
              BookName: "The Four Winds",
              Author: "Kristin Hannah",
              Price: 17.99,
              img: "../src/assets/Image/Product/Product3.jpg",
              viewNumber: 900,
              star: 4.6,
            },
            {
              BookName: "The Night Circus",
              Author: "Erin Morgenstern",
              Price: 13.99,
              img: "../src/assets/Image/Product/Product2.jpg",
              viewNumber: 1100,
              star: 4.4,
            },
            {
              BookName: "The Seven Husbands of Evelyn Hugo",
              Author: "Taylor Jenkins Reid",
              Price: 14.99,
              img: "../src/assets/Image/Product/Product1.jpg",
              viewNumber: 1000,
              star: 4.5,
            },
          ]}
        />
        {/* New Arrivals  Ends*/}
        {/* Discount Starts*/}
        <ListProduct
          title="Discounted Items"
          viewAllLink="All Link"
          products={[
            {
              BookName: "The Silent Patient",
              Author: "Alex Michaelides",
              Price: 8.00,
              img: "../src/assets/Image/Product/Product6.jpg",
              viewNumber: 1000,
              star: 4.5,
              discount: 10,
            },
            {
              BookName: "The Midnight Library",
              Author: "Matt Haig",
              Price: 7.50,
              img: "../src/assets/Image/Product/Product5.jpg",
              viewNumber: 800,
              star: 4.3,
              discount: 15,
            },
            {
              BookName: "The Vanishing Half",
              Author: "Brit Bennett",
              Price: 8.50,
              img: "../src/assets/Image/Product/Product4.jpg",
              viewNumber: 1200,
              star: 4.7,
              discount: 15,
            },
            {
              BookName: "The Four Winds",
              Author: "Kristin Hannah",
              Price: 8.50,
              img: "../src/assets/Image/Product/Product3.jpg",
              viewNumber: 900,
              star: 4.6,
              discount: 15,
            },
            {
              BookName: "The Night Circus",
              Author: "Erin Morgenstern",
              Price: 7.00,
              img: "../src/assets/Image/Product/Product2.jpg",
              viewNumber: 1100,
              star: 4.4,
              discount: 15,
            },
            {
              BookName: "The Seven Husbands of Evelyn Hugo",
              Author: "Taylor Jenkins Reid",
              Price: 7.50,
              img: "../src/assets/Image/Product/Product1.jpg",
              viewNumber: 1000,
              star: 4.5,
              discount: 15,
            },
          ]}
        />
  
        {/* Discount Ends*/}
      </Layout>
    </>
  );
}

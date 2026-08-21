import Banner from "../../components/Banner/Banner";
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
              category : "Fiction",
              books_number : 400 
            },
            {
              category : "Non Fiction",
              books_number : 450 
            },
            {
              category : "Business",
              books_number : 650
            },
            {
              category : "Scinece & Tech",
              books_number : 550
            },
            {
              category : "Romance",
              books_number : 550
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
              Price: 15.99,
              img: "../src/assets/Image/Product/Product6.jpg",
              viewNumber: 1000,
              star: 4.5,
              discount: 10,
            },
            {
              BookName: "The Midnight Library",
              Author: "Matt Haig",
              Price: 14.99,
              img: "../src/assets/Image/Product/Product5.jpg",
              viewNumber: 800,
              star: 4.3,
              discount: 15,
            },
            {
              BookName: "The Vanishing Half",
              Author: "Brit Bennett",
              Price: 16.99,
              img: "../src/assets/Image/Product/Product4.jpg",
              viewNumber: 1200,
              star: 4.7,
              discount: 15,
            },
            {
              BookName: "The Four Winds",
              Author: "Kristin Hannah",
              Price: 17.99,
              img: "../src/assets/Image/Product/Product3.jpg",
              viewNumber: 900,
              star: 4.6,
              discount: 15,
            },
            {
              BookName: "The Night Circus",
              Author: "Erin Morgenstern",
              Price: 13.99,
              img: "../src/assets/Image/Product/Product2.jpg",
              viewNumber: 1100,
              star: 4.4,
              discount: 15,
            },
            {
              BookName: "The Seven Husbands of Evelyn Hugo",
              Author: "Taylor Jenkins Reid",
              Price: 14.99,
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

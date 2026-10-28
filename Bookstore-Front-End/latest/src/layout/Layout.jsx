import { Outlet } from "react-router";
import Footer from "./footer/Footer";
import Header from "./header/Header";



export default function Layout() {

  return (
    <>
      <Header
        menu={[
          {
            menu_title: "Home",
            link: "/",
          },
          {
            menu_title: "Category",
            link: "#",
          },
          {
            menu_title: "Product",
            link: "/fliter_product",
          },
          {
            menu_title: "About Us",
            link: "/about",
          },
          {
            menu_title: "Contact us",
            link: "#",
          },
        ]}
      />

      <main>
        <Outlet />
      </main>
      
      <Footer
        company="Novel-Bookstroe Online"
        company_important={[
          {
            link: "/about",
            title: "About",
          },
          {
            link: "#",
            title: "Term",
          },
          {
            link: "#",
            title: "Privacy policy",
          },
        ]}
        contact ={[{
          link:"#",
          title: "FAQ"
        },
        {
          link:"#",
          title:"Contact Us"
        },
        {
          link:"#",
          title:"Delivery Service"
        }
      ]}
      />
  
    </>
  );
}



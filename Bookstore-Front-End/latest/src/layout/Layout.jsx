import Footer from "./footer/Footer";
import Header from "./header/Header";
import PropTypes from "prop-types";

export default function Layout({ children }) {
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
      <main>{children}</main>
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

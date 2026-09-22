import { Form, Nav, Navbar } from "react-bootstrap";
import { NavLink as RouterNavLink, useNavigate } from "react-router";
import { IoSearchOutline } from "react-icons/io5";
import {
  MdFavoriteBorder,
  MdOutlineShoppingBag,
  MdPerson,
} from "react-icons/md";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [keyWord, setKeyWord] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    const param = new URLSearchParams();
    const text = keyWord.trim();
    if (text) {
      param.set("q", text);
    }
    const query = param.toString();
    navigate(`/fliter_product${query ? `?${query}` : ""}`);
  };
  return (
    <>
      {/* Header Start */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <div className="container">
          {/* logo business */}
          <Navbar.Brand href="/">
            <img
              src="../src/assets/image/Header_Logo.png"
              className="Header_logo"
              alt="Logo"
            />
          </Navbar.Brand>
          {/* main menu  */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {/* search form */}
            <Form className="d-flex search-form" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="ms-2"
                aria-label="Search"
                id="search-input"
                value={keyWord}
                onChange={(event) => setKeyWord(event.target.value)}
              />
              <button type="submit" className="search-button">
                <IoSearchOutline className="search-icon" />
              </button>
            </Form>
            {/* sub menu  */}
            <Nav.Link className="menu" href="/login">
              <MdPerson className="icon-menu" />
            </Nav.Link>

            <Nav.Link className="menu" href="/favourite">
              <MdFavoriteBorder className="icon-menu" />
            </Nav.Link>

            <Nav.Link className="menu" href="/shopping_cart">
              <MdOutlineShoppingBag className="icon-menu" />
            </Nav.Link>
            {/*have already login redirect to profile page if haven't login redirect to login page */}
          </Navbar.Collapse>
        </div>
      </Navbar>
      {/* header end */}
      <Nav className="main_menu" variant="underline">
        <Nav.Item>
          <RouterNavLink
            className={({ isActive }) =>
              `nav-link me-3${isActive ? " fw-bold" : ""}`
            }
            to="/"
          >
            Home
          </RouterNavLink>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="me-3" eventKey="2">
            Categories
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <RouterNavLink
            className={({ isActive }) =>
              `nav-link me-3${isActive ? " fw-bold" : ""}`
            }
            to="/fliter_product"
          >
            Product
          </RouterNavLink>
        </Nav.Item>
        <Nav.Item>
          <RouterNavLink
            className={({ isActive }) =>
              `nav-link me-3${isActive ? " fw-bold" : ""}`
            }
            to="/about"
          >
            About Us
          </RouterNavLink>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="me-3" eventKey="link-7">
            Contact Us
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

import { Dropdown, Form, Nav, Navbar, NavItem, NavLink } from "react-bootstrap";
import { IoSearchOutline } from "react-icons/io5";
import {
  MdFavoriteBorder,
  MdOutlineShoppingBag,
  MdPerson,
} from "react-icons/md";

export default function Header() {
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
            {/* <Nav
              className="me-auto my-2 my-lg-0 fw-bold ms-auto menu-section"
              navbarScroll
            >
              <Nav.Link className="menu" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="menu" href="/list_product">
                Product
              </Nav.Link>
              <Nav.Link className="menu" href="#action3">
                Contact
              </Nav.Link>
              <Nav.Link className="menu" href="#action4">
                FAQ
              </Nav.Link>
            </Nav> */}
            {/* search form */}
            <Form className="d-flex search-form">
              <Dropdown className="categories_dropdown" as={NavItem}>
                <Dropdown.Toggle as={NavLink}>All Categories</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Fiction</Dropdown.Item>
                  <Dropdown.Item>Not Fiction</Dropdown.Item>
                  <Dropdown.Item>Business</Dropdown.Item>
                  <Dropdown.Item>Health</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Form.Control
                type="search"
                placeholder="Search"
                className="ms-2"
                aria-label="Search"
                id="search-input"
              />
              <button type="submit" className="search-button">
                <IoSearchOutline className="search-icon" />
              </button>
            </Form>
            {/* sub menu  */}
            <Nav.Link className="menu">
              <MdPerson className="icon-menu" />
              <div className="notification">
                <div className="norice">Sign In</div>
                <h5 className="notification-badge">Account</h5>
              </div>
            </Nav.Link>

            <Nav.Link className="menu">
              <MdFavoriteBorder className="icon-menu" />
            </Nav.Link>

            <Nav.Link className="menu" href="#action2">
              <MdOutlineShoppingBag className="icon-menu" />
            </Nav.Link>
            {/*have already login redirect to profile page if haven't login redirect to login page */}
          </Navbar.Collapse>
        </div>
      </Navbar>
      {/* header end */}
      <Nav className="main_menu" variant="underline" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link className="me-3" href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="me-3" eventKey="link-1">Categories</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="me-3"  eventKey="link-2">Product</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="me-3" eventKey="link-3">Bestseller</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="me-3" eventKey="link-4">New Arrival</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="me-3" eventKey="link-5">Deals</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="me-3" eventKey="link-6">About Us</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="me-3" eventKey="link-7">Contact Us</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

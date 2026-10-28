import { Form, Nav, Navbar } from "react-bootstrap";
import { NavLink as RouterNavLink, useNavigate } from "react-router";
import { IoSearchOutline } from "react-icons/io5";
import {
  MdFavoriteBorder,
  MdLogout,
  MdOutlineShoppingBag,
  MdPerson,
} from "react-icons/md";
import { useState } from "react";
import PropTypes from "prop-types";
import headerLogo from "../../assets/Image/Header_Logo.png";
import { useAuth } from "../../context/AuthContext";

export default function Header({ menu }) {
  const {loading, isAuthenticated, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const handleLogoutClick = async () => {
    setLoggingOut(true);
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (error) {
      console.log("Logout failed", error);
    } finally {
      setLoggingOut(false);
    }
  };
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
            <img src={headerLogo} className="Header_logo" alt="Logo" />
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
            {!loading &&
              (isAuthenticated ? (
                <>
                  <Nav.Link as={RouterNavLink} className="menu" to="/profile">
                    <MdPerson className="icon-menu" />
                  </Nav.Link>
                  <Nav.Link
                    className="menu"
                    variant="outline-danger"
                    onClick={handleLogoutClick}
                    disabled={loggingOut}
                  >
                    <MdLogout className="icon-menu" />
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={RouterNavLink} className="menu" to="/profile">
                  <MdPerson className="icon-menu" />
                </Nav.Link>
              ))}
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
        {menu.map((item, index) => (
          <Nav.Item key={index}>
            <RouterNavLink
              className={({ isActive }) =>
                `nav-link me-3${isActive ? " fw-bold" : ""}`
              }
              to={item.link}
            >
              {item.menu_title}
            </RouterNavLink>
          </Nav.Item>
        ))}
      </Nav>
    </>
  );
}
Header.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      menu_title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }),
  ),
};

import { Nav } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import {
  MdAccountCircle,
  MdFavorite,
  MdLocationPin,
  MdSecurity,
  MdShoppingBasket,
} from "react-icons/md";
import { NavLink as RouterNavLink } from "react-router";

export default function Listing() {
  return (
    <>
      <div className="account">
        <div className="title">
          <h3>My Account</h3>
        </div>
        <Nav  className="flex-column account_menu">
          <Nav.Item>
            <RouterNavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/profile"
            >
              <MdAccountCircle /> profile
            </RouterNavLink>
          </Nav.Item>

          <Nav.Item>
            <RouterNavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "fw-bold" : ""}`
              }
             
            >
              <MdSecurity /> Change Password
            </RouterNavLink>
          </Nav.Item>
          <Nav.Item>
            <RouterNavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/list_order"
            >
              <MdShoppingBasket /> My Orders
            </RouterNavLink>
          </Nav.Item>
          <Nav.Item>
            <RouterNavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
             to ="/profile_favourite"
            >
              <MdFavorite /> Wishlist
            </RouterNavLink>
          </Nav.Item>
          <Nav.Item>
            <RouterNavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/address"
            >
              <MdLocationPin /> Address
            </RouterNavLink>
          </Nav.Item>
          <Nav.Item>
            <RouterNavLink
              className={({ isActive }) =>
                `nav-link mt-3 ${isActive ? "fw-bold" : ""}`
              }
              to="#"
            >
              <FaSignOutAlt /> Logout
            </RouterNavLink>
          </Nav.Item>
        </Nav>
      </div>
    </>
  );
}

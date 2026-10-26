import { Nav } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import {
  MdAccountCircle,
  MdFavorite,
  MdLocationPin,
  MdSecurity,
  MdShoppingBasket,
} from "react-icons/md";
import { NavLink as RouterNavLink, useNavigate } from "react-router";
import { handleLogout } from "../../auth/auth";
export default function Listing() {
  const navigate = useNavigate();
  const toLogin =async () =>{
    try{
      await handleLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }

    navigate("/login");
  }
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
              <MdAccountCircle /> Profile
            </RouterNavLink>
          </Nav.Item>

          <Nav.Item>
            <RouterNavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/change_password"
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
              onClick={toLogin}
            >
              <FaSignOutAlt /> Logout
            </RouterNavLink>
          </Nav.Item>
        </Nav>
      </div>
    </>
  );
}

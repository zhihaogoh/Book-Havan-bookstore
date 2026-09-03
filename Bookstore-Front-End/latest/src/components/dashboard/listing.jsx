import { Nav } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { MdAccountCircle, MdFavorite, MdLocationPin, MdSecurity, MdShoppingBasket } from "react-icons/md";

export default function Listing() {
  return (
    <>
    <div className="account">
        <div className="title">
        <h3>
          My Account
        </h3>
      </div>
      <Nav defaultActiveKey="/profile" className="flex-column account_menu">
        <Nav.Link eventKey={"/profile"} href="/profile" active> <MdAccountCircle/> Active</Nav.Link>
        <Nav.Link > <MdSecurity /> Change Password</Nav.Link>
        <Nav.Link > <MdShoppingBasket /> My Orders</Nav.Link>
        <Nav.Link > <MdFavorite /> Wishlist</Nav.Link>
          <Nav.Link > <MdLocationPin /> Address</Nav.Link>
           <Nav.Link className="mt-3" > <FaSignOutAlt /> Logout</Nav.Link>
      </Nav>
    </div>
    
    </>
  );
}

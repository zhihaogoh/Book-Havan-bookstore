//import { useState } from 'react'

import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import FliterProduct from "./pages/fliter_product/fliter_product";
import ProductDetail from "./pages/product_detail/product_detial";
import ShoppingCart from "./pages/Cart/shopping_cart";
import CheckOut from "./pages/check_out/check_out";
import Favoutite from "./pages/favourite/favourite";
import Login from "./pages/login/login";
import ForgotPassword from "./pages/forgot_password/forgot_password";
import Profile from "./pages/profile/profile";
import Address from "./pages/Address/address";
import AddressDetail from "./pages/profile/address_detail";
import ProfileFavourite from "./pages/profile/profile_favourite";
import ListOrder from "./pages/profile/list_order";
import ChangePassword from "./pages/profile/change_password";
import EditProfile from "./pages/profile/edit_profile";
import OrderDetial from "./pages/profile/order_detail";

function App() {
  //const [count, setCount] = useState(0)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/fliter_product",
      element: <FliterProduct />,
    },
    {
      path: "/product_detail/:productId",
      element: <ProductDetail />,
    },
    {
      path: "/shopping_cart",
      element: <ShoppingCart />,
    },
    {
      path: "/check_out",
      element: <CheckOut />,
    },
    {
      path: "/favourite",
      element: <Favoutite />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgot_password",
      element: <ForgotPassword />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/address",
      element: <Address />,
    },
    {
      path: "/address/new",
      element: <AddressDetail />,
    },
    {
      path: "profile_favourite",
      element: <ProfileFavourite />,
    },
    {
      path: "/list_order",
      element: <ListOrder />,
    },
    {
      path: "/change_password",
      element: <ChangePassword />,
    },
    {
      path: "/edit_profile",
      element: <EditProfile />
    },
    {
      path: "/order_detial",
      element: <OrderDetial />
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

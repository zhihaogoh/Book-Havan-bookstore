//import { useState } from 'react'

import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import FliterProduct from "./pages/fliter_product/fliter_product";
import ProductDetail from "./pages/product_detail/product_detial";
import ShoppingCart from "./pages/Cart/shopping_cart";
import CheckOut from "./pages/check_out/check_out";

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
      element: <ShoppingCart/>,
    },
    {
      path: "/check_out",
      element: <CheckOut />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

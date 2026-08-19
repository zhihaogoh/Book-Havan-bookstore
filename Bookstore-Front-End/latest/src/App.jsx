//import { useState } from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router';

import Home from './pages/Home/Home';
import About from './pages/About/About';

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
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

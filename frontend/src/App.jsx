import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import BookDetails from "./components/BookDetails";

import { booksData } from "./api/Api";
import { usersData } from "./api/Api";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";

import Authors from "./pages/Authors";
import Register from "./pages/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import Categories from "./pages/Categories";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: booksData,
      },
      {
        path: "/book/:id",
        element: <BookDetails />,
      },

      {
        path: "/cart",
        element: <Cart />,
        loader: booksData,
      },

      {
        path: "/authors",
        element: <Authors />,
        loader: booksData,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: usersData,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/categories",
        element: <Categories />,
        loader: booksData,
      },
    ],
  },
]);

function App() {
  return (
    <div className="font-body">
      <RouterProvider router={router} />
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;

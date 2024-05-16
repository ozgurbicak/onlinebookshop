import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddBook from "./pages/Add/AddBook";
import Orders from "./pages/Orders/Orders";
import OrderDetails from "./pages/Orders/OrderDetails";
import ListBook from "./pages/List/ListBook";
import ListUser from "./pages/List/ListUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddUser from "./pages/Add/AddUser";
function App() {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/listbook" element={<ListBook />} />
          <Route path="/listuser" element={<ListUser />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orderdetails/:id" element={<OrderDetails />} />
        </Routes>
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
    </div>
  );
}

export default App;

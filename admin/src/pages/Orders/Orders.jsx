import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Orders() {
  const [orders, setOrders] = useState([]);
  console.log(orders);
  const navigate = useNavigate();

  function handleDetail(itemID) {
    console.log(orders.find((order) => order.id === itemID));

    navigate(`/orderdetails/${itemID}`, {
      state: {
        item: orders.find((order) => order.id === itemID),
      },
    });
  }

  const ordersData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      // console.log(response);
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeOrder = async (orderID) => {
    console.log(orderID);
    const response = await axios.post(
      "http://localhost:5000/api/remove/order",
      {
        id: orderID,
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      await ordersData();
    }
  };

  useEffect(() => {
    ordersData();
  }, []);

  return (
    <div className="orders flex flex-col">
      <p>All ORDERS LIST</p>
      <div className="orders-table">
        <div className="orders-table-format title">
          <h3>ORDER ID</h3>
          <h3>ORDER DATE</h3>
          <h3>FULL NAME</h3>
          <h3>PHONE NUMBER</h3>
          <h3>TOTAL AMOUNT</h3>
          <h3>ACTION</h3>
        </div>
        {orders.map((item, index) => {
          return (
            <div
              onClick={() => handleDetail(item.id)}
              key={index}
              className="orders-table-format"
            >
              <p>{item.id}</p>
              <p>{item.ordered_at}</p>
              <p>{item.full_name}</p>
              <p>{item.phone_number}</p>
              <p>{item.total_amount}</p>
              <p onClick={() => removeOrder(item.id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;

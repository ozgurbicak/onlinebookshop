import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Orders.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const navigate = useNavigate();
  const chartRef = useRef(null);

  const ordersData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      if (response.data.success) {
        let filteredOrders = response.data.data;

        const now = new Date();
        if (dateFilter === "lastWeek") {
          const lastWeek = new Date();
          lastWeek.setDate(now.getDate() - 7);
          filteredOrders = filteredOrders.filter(
            (order) =>
              new Date(order.ordered_at) >= lastWeek &&
              new Date(order.ordered_at) <= now
          );
        } else if (dateFilter === "lastMonth") {
          const lastMonth = new Date();
          lastMonth.setMonth(now.getMonth() - 1);
          filteredOrders = filteredOrders.filter(
            (order) =>
              new Date(order.ordered_at) >= lastMonth &&
              new Date(order.ordered_at) <= now
          );
        } else {
          if (startDate) {
            filteredOrders = filteredOrders.filter(
              (order) => new Date(order.ordered_at) >= new Date(startDate)
            );
          }
          if (endDate) {
            filteredOrders = filteredOrders.filter(
              (order) => new Date(order.ordered_at) <= new Date(endDate)
            );
          }
        }

        setOrders(filteredOrders);
        createChart(filteredOrders);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeOrder = async (orderID) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/remove/order",
        { id: orderID }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await ordersData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  function handleDetail(itemID) {
    navigate(`/orderdetails/${itemID}`, {
      state: { item: orders.find((order) => order.id === itemID) },
    });
  }

  const createChart = (data) => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("ordersChart");
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const booksData = {};
    data.forEach((order) => {
      const productsData = JSON.parse(order.products_data);
      productsData.forEach((product) => {
        const productName = product.book_name;
        const productQuantity = product.quantity;
        if (booksData[productName]) {
          booksData[productName] += productQuantity;
        } else {
          booksData[productName] = productQuantity;
        }
      });
    });

    if (Object.keys(booksData).length === 0) {
      toast.error("There are no books in any orders.");
      return;
    }

    const sortedBooks = Object.entries(booksData)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    const labels = sortedBooks.map(([name]) => name);
    const quantities = sortedBooks.map(([, quantity]) => quantity);

    chartRef.current.data.labels = labels;
    chartRef.current.data.datasets.push({
      label: "Sales",
      data: quantities,
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    });

    chartRef.current.update();
  };

  useEffect(() => {
    ordersData();
  }, [startDate, endDate, dateFilter]);

  const handleRemoveOrder = (event, orderID) => {
    event.stopPropagation();
    removeOrder(orderID);
  };

  const handleDateFilterChange = (filter) => {
    setDateFilter(filter);
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="orders flex flex-col">
      <p>All ORDERS LIST</p>
      <div className="date-filter">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setDateFilter("custom");
            }}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setDateFilter("custom");
            }}
          />
        </label>
        <button onClick={() => handleDateFilterChange("all")}>All</button>
        <button onClick={() => handleDateFilterChange("lastWeek")}>
          Last 1 Week
        </button>
        <button onClick={() => handleDateFilterChange("lastMonth")}>
          Last 1 Month
        </button>
      </div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>ORDER DATE</th>
            <th>FULL NAME</th>
            <th>PHONE NUMBER</th>
            <th>TOTAL AMOUNT</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr onClick={() => handleDetail(item.id)} key={index}>
              <td>{item.id}</td>
              <td>{item.ordered_at}</td>
              <td>{item.full_name}</td>
              <td>{item.phone_number}</td>
              <td>{item.total_amount}</td>
              <td
                onClick={(e) => handleRemoveOrder(e, item.id)}
                className="cursor"
              >
                X
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="chart-container">
        <canvas id="ordersChart"></canvas>
      </div>
    </div>
  );
}

export default Orders;

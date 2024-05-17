import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Orders.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const chartRef = useRef(null);

  const ordersData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      if (response.data.success) {
        setOrders(response.data.data);
        createChart(response.data.data);
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
      chartRef.current.destroy(); // Mevcut Chart nesnesini yok et
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

    const booksData = {}; // Kitap satış verilerini saklamak için bir obje
    data.forEach((order) => {
      const productsData = JSON.parse(order.products_data); // JSON dizesini nesneye dönüştür
      productsData.forEach((product) => {
        const productName = product.book_name;
        const productQuantity = product.quantity;
        if (booksData[productName]) {
          booksData[productName] += productQuantity; // Eğer kitap zaten varsa miktarını arttır
        } else {
          booksData[productName] = productQuantity; // Yeni kitapsa objeye ekle
        }
      });
    });

    if (Object.keys(booksData).length === 0) {
      // Eğer siparişlerde hiç kitap yoksa, kullanıcıya bir hata mesajı göster
      toast.error("There are no books in any orders.");
      return;
    }

    chartRef.current.data.labels = Object.keys(booksData); // Kitap isimleri
    chartRef.current.data.datasets.push({
      label: "Sales",
      data: Object.values(booksData), // Kitap satış miktarları
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    });

    chartRef.current.update();
  };

  useEffect(() => {
    ordersData();
  }, []);

  const handleRemoveOrder = (event, orderID) => {
    event.stopPropagation(); // Divin onClick'ini etkilemeden sadece X'in onClick'ini çalıştırır
    removeOrder(orderID);
  };

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
        {orders.map((item, index) => (
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
            <p
              onClick={(e) => handleRemoveOrder(e, item.id)}
              className="cursor"
            >
              X
            </p>
          </div>
        ))}
      </div>
      <div className="chart-container">
        <canvas id="ordersChart"></canvas>
      </div>
    </div>
  );
}

export default Orders;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
import { userDefault } from "../assets/index";
import { logout } from "../redux/UserSlice";
import axios from "axios";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // State to track expanded order

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const reduxUserEmail = useSelector((state) => state.user.userData.email);
  const data = useLoaderData();
  const [ordersData, setOrdersData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUserData = data.data;
        const matchedUser = fetchedUserData.find(
          (user) => user.email === reduxUserEmail
        );
        if (matchedUser) {
          setUserData(matchedUser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn && !userData) {
      fetchData();
    }
  }, [isLoggedIn, reduxUserEmail, userData, data.data]);

  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
    window.location.reload();
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        if (response.data.success) {
          setOrdersData(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <p className="text-gray-600">Please log in to view your profile.</p>
        <Link
          to="/login"
          className="text-blue-500 hover:underline font-semibold"
        >
          Log in
        </Link>
      </div>
    );
  }

  if (loading || !userData || !ordersData) {
    return <div className="text-center">Loading...</div>;
  }

  const userOrders = ordersData.filter(
    (order) => order.email === reduxUserEmail
  );

  return (
    <div className="container mx-auto mt-10">
      <div className="flex items-center mb-6">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src={userData.picture || userDefault}
          alt="User"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {userData.full_name || "Full Name"}
          </h2>
          <p className="text-gray-600">{userData.email || "Email"}</p>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Your Orders:</h3>
        {userOrders.map((order) => (
          <div key={order.id} className="mb-4">
            <button
              className="text-lg font-semibold mb-2 text-blue-500 hover:underline"
              onClick={() =>
                setExpandedOrderId(
                  expandedOrderId === order.id ? null : order.id
                )
              }
            >
              Order ID: {order.id}
            </button>
            {expandedOrderId === order.id && (
              <div>
                <p className="text-sm mb-2">Ordered At: {order.ordered_at}</p>
                <p className="text-sm mb-2">
                  Total Amount: {order.total_amount}
                </p>
                <h3 className="text-lg font-semibold mb-2">Products:</h3>
                <ul>
                  {JSON.parse(order.products_data).map((product, index) => (
                    <li key={index} className="mb-2 flex items-center">
                      <img
                        src={product.image}
                        alt={product.book_name}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <div>
                        <p className="text-sm">
                          <strong>Book Name:</strong> {product.book_name}
                        </p>
                        <p className="text-sm">
                          <strong>Author:</strong> {product.author_name}
                        </p>
                        <p className="text-sm">
                          <strong>Price:</strong> ${product.price}
                        </p>
                        <p className="text-sm">
                          <strong>Quantity:</strong> {product.quantity}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        {/* <Link
          to="/edit-profile"
          className="text-blue-500 hover:underline font-semibold mr-4"
        >
          Edit Profile
        </Link> */}
        <button
          onClick={handleLogout}
          className="text-red-500 hover:underline font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;

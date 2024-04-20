import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
import { userDefault } from "../assets/index";
import { logout } from "../redux/UserSlice";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const reduxUserEmail = useSelector((state) => state.user.userData.email);
  const data = useLoaderData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUserData = data.data;

        // Compare email from Redux store with fetched data
        const matchedUser = fetchedUserData.find(
          (user) => user.email === reduxUserEmail
        );
        console.log(matchedUser);
        if (matchedUser) {
          setUserData(matchedUser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    // Fetch data if logged in and userData is null
    if (isLoggedIn && !userData) {
      fetchData();
    }
  }, [isLoggedIn, reduxUserEmail, userData, data.data]);

  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
  }

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

  // Display loading message while data is being fetched
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // Display profile information if data is fetched successfully
  return (
    <div className="container mx-auto mt-10">
      <div>
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full"
            src={userData?.picture || userDefault}
            alt="User"
          />

          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {userData?.full_name || "Full Name"}
            </h2>
            <p className="text-gray-600">{userData?.email || "Email"}</p>
          </div>
        </div>
        <div className="mt-6">
          <Link
            to="/edit-profile"
            className="text-blue-500 hover:underline font-semibold mr-4"
          >
            Edit Profile
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:underline font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

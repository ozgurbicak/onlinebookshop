import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
import { userDefault } from "../assets/index";
import { logout } from "../redux/UserSlice";

function Profile() {
  const [userData, setUserData] = useState(null);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const reduxUserEmail = useSelector((state) => state.user.userData.email);
  const data = useLoaderData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUserData = data.data;

        // Redux store'daki email ile veritabanından çekilen email'i karşılaştır
        const matchedUser = fetchedUserData.find(
          (user) => user.email === reduxUserEmail
        );
        console.log(matchedUser);
        if (matchedUser) {
          setUserData(matchedUser);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Redux'ta giriş yapılmışsa ve userData null ise veritabanından verileri çek
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

  if (!userData) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <div>
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full"
            src={userData.picture || userDefault}
            alt="User"
          />

          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {console.log(userData)}
              {userData.full_name || "User"}
            </h2>
            <p className="text-gray-600">
              {userData.email || "example@example.com"}
            </p>
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

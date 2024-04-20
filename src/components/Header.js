import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logo, cart, userDefault } from "../assets/index";
import { usersData } from "../api/Api";

function Header() {
  const productData = useSelector((state) => state.book.productData);
  const quantity = productData.length;

  // Kullanıcı giriş yapmış mı kontrolü
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // Kullanıcı bilgileri state'i
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await usersData();
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);
  console.log(userData);
  return (
    <div className="font-title w-full h-20 bg-white border-b-[1px] border-b-gray-900 sticky top-0 z-50">
      <div className="max-w-screen-2xl h-full ml-20 mr-auto flex items-center justify-between">
        <Link to="/">
          <div>
            <img className="w-36 h-18 rounded-full" src={logo} alt="logo" />
          </div>
        </Link>
        <div className="flex gap-9 items-center">
          <ul className="flex gap-9 items-center">
            <li className="text-base text-blue-950 font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Home
            </li>
            <li className="text-base text-blue-950 font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Categories
            </li>
            <li className="text-base text-blue-950 font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Authors
            </li>
            <li className="text-base text-blue-950 font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Publishers
            </li>
          </ul>
          <Link to="/cart">
            <div className="relative">
              <img className="w-10 h-9" src={cart} alt="cart" />
              <span className="absolute w-6 top-1.5 left-3 text-sm flex items-center justify-center font-semibold">
                {quantity}
              </span>
            </div>
          </Link>

          {isLoggedIn ? (
            <Link to="/profile">
              <div className="flex items-center">
                <img
                  className="w-9 h-9 rounded-full"
                  src={userData?.picture || userDefault}
                  alt="user"
                />
                <span className="ml-2">{userData?.userName}</span>
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <img
                className="w-9 h-9 rounded-full"
                src={userDefault}
                alt="user"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

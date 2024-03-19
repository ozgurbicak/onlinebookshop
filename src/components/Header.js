import React from "react";
import { logo, cart, user } from "../assets/index";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="font-title w-full h-20 bg-white border-b-[1px] border-b-gray-900 sticky top-0 z-50">
      <div className="max-w-screen-2xl h-full ml-20 mr-auto flex items-center justify-between">
        <Link to="/">
          <div>
            <img className="w-36 h-18 rounded-full" src={logo} alt="logo"></img>
          </div>
        </Link>
        <div className="flex gap-9 items-center">
          <ul className="flex gap-9 items-center">
            <li className="text-base text-blue-950  font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Home
            </li>
            <li className="text-base text-blue-950 font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Categories
            </li>
            <li className="text-base text-blue-950  font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Authors
            </li>
            <li className="text-base text-blue-950  font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Publishers
            </li>
          </ul>

          <div className="relative">
            <img className="w-10  h-9" src={cart} alt="cart"></img>
            <span className="absolute w-6 top-1.5 left-3 text-sm flex items-center justify-center font-semibold">
              0
            </span>
          </div>
          <img className="w-9 h-9 rounded-xl" src={user} alt="user" />
        </div>
      </div>
    </div>
  );
}

export default Header;

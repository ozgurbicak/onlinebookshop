import React from "react";
import { logo } from "../assests/index";

function Header() {
  return (
    <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-900">
      <div className="max-w-screen-2xl h-full ml-20 mr-auto flex items-center justify-between">
        <div>
          <img className="w-24" src={logo} alt="logo"></img>
        </div>
        <div>
          <ul className="flex gap-10 items-center">
            <li className="text-base text-blue-950  font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer">
              Home
            </li>
            <li className="text-base text-blue-950 font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer">
              Categories
            </li>
            <li className="text-base text-blue-950  font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer">
              Authors
            </li>
            <li className="text-base text-blue-950  font-bold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer">
              Publishers
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;

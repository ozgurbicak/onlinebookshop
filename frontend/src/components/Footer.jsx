import React from "react";
import { logodark, payment } from "../assets/index";
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaHome,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { MdLocationOn } from "react-icons/md";
import { BsPersonFill, BsPaypal } from "react-icons/bs";
function Footer() {
  return (
    <div className="bg-black text-gray-400 py-20 font-title">
      <div className="max-w-screen-xl mx-auto grid grid-cols-4">
        <div className="flex flex-col gap-7">
          <img className="w-32" src={logodark} alt="logodark" />
          <img className="w-56" src={payment} alt="payment"></img>
          <div className="flex gap-5 text-lg text-gray-200 ">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-xl text-white hover:text-blue-500 transition duration-300 cursor-pointer" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-xl text-white hover:text-pink-500 transition duration-300 cursor-pointer" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-xl text-white hover:text-blue-400 transition duration-300 cursor-pointer" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-xl text-white hover:text-red-500 transition duration-300 cursor-pointer" />
            </a>
            <Link to="/">
              <FaHome className="text-xl text-white hover:text-green-500 transition duration-300 cursor-pointer" />
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">locate us</h2>
          <div className="text-base flex flex-col gap-2">
            <p>Gazipasa, Seyhan-Adana</p>
            <p>Mobile: +905455550011</p>
            <p>e-mail: storyteller@gmail.com </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">profile</h2>
          <div className="text-base flex flex-col gap-2"></div>
          <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
            <span className="text-lg">
              <BsPersonFill />
            </span>
            <Link to="/profile">my account</Link>
          </p>

          <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
            <span className="text-lg">
              <FaHome />
            </span>
            <Link to="/profile"> order tracking</Link>
          </p>
          <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
            <span className="text-lg">
              <MdLocationOn />
            </span>
            <a href="mailto:storyteller@gmail.com">help & support</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;

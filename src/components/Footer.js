import React from "react";
import { logo } from "../assests/index";
function Footer() {
  return (
    <div className="bg-black text-gray-400 py-20 font-title">
      <div className="max-w-screen-xl mx-auto">
        logo
        <div>
          <img src={logo} alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default Footer;

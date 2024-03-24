import React from "react";

function Register() {
  return (
    <form className="flex justify-center items-center h-screen font-title">
      <div className="w-3/5 h-4/5 bg-slate-100 border border-black flex justify-center items-center rounded-md shadow-lg">
        <div className="flex flex-col w-4/5">
          <div className="mb-4">
            <label className="m-2 p-2 font-bold text-gray-800" htmlFor="name">
              Full Name
            </label>
            <input
              className="m-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              name="name"
              type="text"
              required
            />
          </div>
          <div className="mb-4">
            <label className="m-2 p-2 font-bold text-gray-800" htmlFor="email">
              E-Mail Address
            </label>
            <input
              className="m-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="m-2 p-2 font-bold text-gray-800"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="m-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              name="password"
              type="password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="m-2 p-2 font-bold text-gray-800"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="m-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              name="confirmPassword"
              type="password"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              className="m-2 p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Register;

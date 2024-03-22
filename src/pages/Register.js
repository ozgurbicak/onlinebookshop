import React from "react";
function Register() {
  return (
    <form
      className="flex justify-center items-center h-[700px] font-title"
      type="submit"
    >
      <div className="w-3/5 h-4/5 border border-black flex justify-center items-center">
        <div className="border border-red-800 ">
          <div className="mb-6">
            <label className="m-2 p-4 font-bold" htmlFor="name">
              Full Name
            </label>
            <input
              className="m-2 p-2 w-[200px]"
              name="name"
              type="text"
              required
            ></input>
          </div>
          <div className="mb-6">
            <label className="m-2 p-4 font-bold" htmlFor="e-mail">
              E-Mail Address
            </label>
            <input
              className="m-2 p-2 w-[200px]"
              name="email"
              type="text"
              required
            ></input>
          </div>

          <div className="mb-6">
            <label className="m-2 p-4 font-bold" htmlFor="password">
              Password
            </label>
            <input
              className="m-2 p-2 w-[200px]"
              name="password"
              type="password"
              required
            ></input>
          </div>

          <div className="mb-6">
            <label className="m-2 p-4 font-bold" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="m-2 p-2 w-[200px]"
              name="password"
              type="password"
              required
            ></input>
          </div>

          <div className="flex justify-center">
            <button className="m-4 p-6 bg-slate-700 font-white" type="submit">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default Register;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // react-toastify ekleyin
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [full_name, setFull_Name] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handlePhoneChange = (event) => {
    const formattedPhoneNumber = event.target.value
      .replace(/\D/g, "")
      .slice(0, 10);
    setPhone_number(formattedPhoneNumber);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (phone_number.length !== 10) {
      toast.error("Phone number must be 10 digits long.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        full_name,
        email,
        phone_number,
        password,
        confirmPassword,
      });
      if (response.data.success) {
        toast.success("Registration Successful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      console.error("Hata:", error);
      toast.error("Please check your information");
    }
  };

  function handleFullName(e) {
    setFull_Name(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center h-screen font-title"
    >
      <div className="w-full max-w-md bg-slate-100 shadow-md rounded-md overflow-hidden">
        <div className="px-8 py-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Register
          </h2>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              onChange={handleFullName}
              id="full_name"
              name="full_name"
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              E-Mail Address
            </label>
            <input
              type="email"
              onChange={handleEmail}
              id="email"
              name="email"
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              required
              id="phoneNumber"
              name="phoneNumber"
              value={phone_number}
              onChange={handlePhoneChange}
              title="Please enter only numeric characters."
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              onChange={handlePassword}
              id="password"
              name="password"
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              onChange={handleConfirmPassword}
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Register;

import axios from "axios";
import React from "react";
import { useState } from "react";
function Register() {
  const [full_name, setFull_Name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null); // State for error message

  async function handleSubmit(event) {
    event.preventDefault(); // Formun otomatik gönderilmesini engeller
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        full_name,
        email,
        password,
        confirmPassword,
      });
      if (response.data.success) {
        console.log("Giriş başarılı!");
        // Başarılı giriş durumunda yapılacak işlemler buraya gelebilir
      } else {
        setErrorMessage(response.data.message); // Sunucudan gelen hata mesajını göster
        alert(errorMessage);
      }
    } catch (error) {
      setErrorMessage("Bir hata oluştu."); // Genel hata mesajı
      alert(errorMessage);
    }
  }
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

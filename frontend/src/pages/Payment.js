import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../redux/BookSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productData = useSelector((state) => state.book.productData);
  const [totalAmount, setTotalAmount] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
  });

  const cities = [
    "Adana",
    "İstanbul",
    "Ankara",
    "Antalya",
    "İzmir",
    "Bursa",
    "Kocaeli",
    "Mersin",
  ];

  useEffect(() => {
    let price = 0;
    productData.forEach((item) => {
      price = price + item.price * item.quantity;
    });

    setTotalAmount(price.toFixed(2));
  }, [productData]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handlePhoneChange = (event) => {
    const formattedPhoneNumber = event.target.value
      .replace(/\D/g, "")
      .slice(0, 10);
    setFormData({ ...formData, phoneNumber: formattedPhoneNumber });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.phoneNumber.length !== 10) {
      alert("Phone number must be 10 digits long.");
      return;
    }

    if (!event.target.checkValidity()) {
      event.target.reportValidity();
      return;
    }
    if (productData.length > 0) {
      try {
        const response = await axios.post("http://localhost:5000/api/order", {
          full_name: formData.firstName + " " + formData.lastName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          address: formData.address,
          city: formData.city,
          total_amount: totalAmount,
          productData,
        });

        if (response.data.success) {
          console.log("başarılı");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            address: "",
            city: "",
          });
          toast("Siparişiniz başarıyla tamamlandı.");

          dispatch(resetCart());
          setTimeout(() => {
            navigate("/cart");
          }, 2000);
        } else {
          throw new Error("Failed to add order");
        }
      } catch (error) {
        toast.error(
          "An error occurred while placing your order. Please try again."
        );

        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="w-full md:w-1/2 p-12 bg-white rounded-md shadow-md">
        <div className="w-full">
          <h3 className="text-lg font-semibold ml-10">Cart Items</h3>
          <ul className="mt-5">
            {productData.map((item) => (
              <li
                key={item.id}
                className="flex flex-row items-center pl-5 mb-5"
              >
                <img
                  src={item.image}
                  alt={item.book_name}
                  className="w-12 h-12 mr-4 rounded-md"
                />
                <div>
                  <p>{item.book_name}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-lg font-semibold">Total: ${totalAmount}</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-12 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-semibold mb-2"
            >
              First Name
            </label>
            <input
              required
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-semibold mb-2"
            >
              Last Name
            </label>
            <input
              required
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your last name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-semibold mb-2"
            >
              Phone Number
            </label>
            <input
              required
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number (10 digits)"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-semibold mb-2"
            >
              Address
            </label>
            <textarea
              required
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your address"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-700 font-semibold mb-2"
            >
              City
            </label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            Pay ${totalAmount}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;

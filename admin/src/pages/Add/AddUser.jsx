import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddUser() {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState(false);

  const handlePictureChange = (e) => {
    setPicture(e.target.files[0]);
  };
  const handlePhoneChange = (event) => {
    const formattedPhoneNumber = event.target.value
      .replace(/\D/g, "")
      .slice(0, 10);
    setPhoneNumber(formattedPhoneNumber);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phone_number.length !== 10) {
      toast.error("Phone number must be 10 digits long.");
      return;
    }
    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("email", email);
    formData.append("phone_number", phone_number);
    formData.append("address", address);
    formData.append("password", password);
    formData.append("picture", picture);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/adduser",
        formData
      );

      if (response.data.success) {
        toast.success("User added successfully!");

        setFullName("");
        setEmail("");
        setPhoneNumber("");
        setAddress("");
        setPassword("");
        setPicture(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="add-user">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone_number}
          onChange={handlePhoneChange}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={handlePictureChange} />{" "}
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddUser;

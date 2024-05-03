import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";

import { toast } from "react-toastify";

function Add() {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Romance");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");

  function handleName(e) {
    setName(e.target.value);
  }
  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleCategory(e) {
    setCategory(e.target.value);
  }
  function handlePrice(e) {
    setPrice(e.target.value);
  }
  function handleAuthor(e) {
    setAuthor(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("author", author);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", Number(price));

    if (name && image && description && category && price) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/add",
          formData
        );

        if (response.data.success) {
          toast.success("Book added successfully!");
          setImage(false);
          setName("");
          setAuthor("");
          setCategory("Romance");
          setDescription("");
          setPrice("");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error("Failed to add book.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again.");
      }
    } else {
      toast("Enter required Fields");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (name && image && description && category && price) {
  //     const fetchData = await fetch(`http://localhost:5000/api/add`, {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(name, image, description, category, price),
  //     });

  //     const fetchRes = await fetchData.json();

  //     console.log(fetchRes);
  //     toast(fetchRes.message);
  //   } else {
  //     toast("Enter required Fields");
  //   }
  // };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>

          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="add-book-name flex-col">
          <p>Book name</p>
          <input
            onChange={handleName}
            value={name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-author-name flex-col">
          <p>Author's Name</p>
          <input
            onChange={handleAuthor}
            value={author}
            type="text"
            name="author"
            placeholder="Author's name"
            required
          />
        </div>

        <div className="add-book-description flex-col">
          <p>Book Description</p>
          <textarea
            onChange={handleDescription}
            value={description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Book Category</p>
            <select onChange={handleCategory} name="category" value={category}>
              <option value="Romance">Romance</option>
              <option value="Comedy">Comedy</option>
              <option value="Mystery">Mystery</option>
              <option value="Thriller">Thriller</option>
              <option value="Adventure">Adventure</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Fiction">Fiction</option>
              <option value="Family-Saga">Family-Saga</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Book Price</p>
            <input
              onChange={handlePrice}
              value={price}
              type="Number"
              name="price"
              placeholder="$"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
}

export default Add;

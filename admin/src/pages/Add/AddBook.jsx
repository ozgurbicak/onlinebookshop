import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function AddBook() {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Romance");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [stock, setStock] = useState(""); // Yeni durum

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
  function handleStock(e) {
    setStock(e.target.value); // Stok durumunu güncellemek için
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
    formData.append("stock", Number(stock));

    if (!image || !name || !description || !category || !price || !stock) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/addbook",
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
        setStock("");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Failed to add book.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  const additionalCategories = [
    "thriller",
    "science-fiction",
    "techno-thriller",
    "political-thriller",
    "novel",
    "drama",
    "fantasy",
    "adventure",
    "fiction",
    "leterature",
    "general-fiction",
    "romantic",
    "tragicomedy",
    "mystery",
    "contemporary-fiction",
    "humor",
    "war",
    "historical-fiction",
    "suspense",
    "domestic-fiction",
    "LGBTQ+Fiction",
    "comedy",
  ];

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
              <option value="Fantasy">Fantasy</option>
              <option value="Fiction">Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Comedy">Comedy</option>
              {/* Diğer kategorileri buraya ekleyin */}
              {additionalCategories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
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
          <div className="add-stock flex-col">
            {" "}
            {/* Yeni stok alanı */}
            <p>Stock</p>
            <input
              onChange={handleStock}
              value={stock}
              type="Number"
              name="stock"
              placeholder="Stock"
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

export default AddBook;

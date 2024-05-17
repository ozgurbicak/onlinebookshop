import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart } from "../redux/BookSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BooksCard({ bookData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const id = bookData.book_name;
  const idString = id.toLowerCase().split(" ").join("");

  function handleBook() {
    navigate(`/book/${idString}`, {
      state: {
        item: bookData,
      },
    });
  }

  const productData = useSelector((state) => state.book.productData);

  function handleAddToCart() {
    if (isAddingToCart) return;
    setIsAddingToCart(true);

    const existingItem = productData.find((item) => item.id === bookData.id);
    const existingQuantity = existingItem ? existingItem.quantity : 0;

    if (existingItem && existingQuantity >= 10) {
      toast.error(
        `You can only have a maximum of 10 of the same book in your cart`
      );
      setIsAddingToCart(false);
    } else if (existingQuantity + 1 > bookData.stock) {
      toast.error(`You cannot add more than ${bookData.stock} of this book`);
      setIsAddingToCart(false);
    } else if (bookData.stock <= 0) {
      toast.error(`This book is out of stock`);
      setIsAddingToCart(false);
    } else {
      dispatch(
        addToCart({
          id: bookData.id,
          book_name: bookData.book_name,
          author_name: bookData.author_name,
          quantity: 1,
          price: bookData.price,
          image: bookData.image,
        })
      );
      toast.success(
        <span className="text-white">
          <span className="text-green-500">"{bookData.book_name}"</span>
          <br /> has been added to your cart
        </span>
      );

      setTimeout(() => setIsAddingToCart(false), 1000);
    }
  }

  return (
    <div className="group relative">
      <div
        onClick={handleBook}
        className={`cursor-pointer overflow-hidden relative ${
          bookData.stock <= 0 ? "pointer-events-none" : ""
        }`}
      >
        <img
          className={`w-full h-100 object-cover object-center group-hover:scale-105 duration-500 ${
            bookData.stock <= 0 ? "opacity-50 grayscale" : ""
          }`}
          src={bookData.image}
          alt="bookImage"
        />
        {bookData.stock <= 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-red-600 bg-white p-2 rounded">
              Sold Out
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-center">
          {bookData.book_name}
        </h2>
        <p className="text-gray-600 mb-2 text-center">{bookData.author_name}</p>

        <div className="flex justify-between items-center p-1 m-3">
          <p className="text-black font-semibold p-3">{bookData.price} USD</p>
          <button
            onClick={handleAddToCart}
            className={`bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors duration-300 ${
              isAddingToCart && "opacity-50 cursor-not-allowed"
            }`}
            disabled={isAddingToCart || bookData.stock <= 0}
          >
            {bookData.stock > 0 ? "Add to Cart" : "Sold Out"}
          </button>
        </div>

        {bookData.stock < 10 && bookData.stock > 0 && (
          <p className="text-red-500 text-center">
            Only {bookData.stock} left in stock!
          </p>
        )}
      </div>
    </div>
  );
}

export default BooksCard;

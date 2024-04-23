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
    if (isAddingToCart) return; // Do nothing if already adding to cart
    setIsAddingToCart(true);

    const existingItem = productData.find((item) => item.id === bookData.id);
    if (existingItem && existingItem.quantity >= 10) {
      toast.error(
        `You can only have a maximum of 10 of the same book in your cart`
      );
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

      setTimeout(() => setIsAddingToCart(false), 1000); // Enable button after 1 second
    }
  }

  return (
    <div className="group relative">
      <div onClick={handleBook} className="cursor-pointer overflow-hidden">
        <img
          className="w-full h-auto max-w-[300px] max-h-[300px] object-contain object-center group-hover:scale-105 duration-500"
          src={bookData.image}
          alt="bookImage"
        />
      </div>
      <div className=" p-4">
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
            disabled={isAddingToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default BooksCard;

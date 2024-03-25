import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart } from "../redux/BookSlice";
import { ToastContainer, toast } from "react-toastify";

function BooksCard({ bookData }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const id = bookData.book_name;
  const idString = id.toLowerCase().split(" ").join("");

  //handlebook fonksiyonu her çağrıldıgında kitaplara tıklamayla birlikte
  //react-dom navigate ile /book/kitabınidsine gidiyoruz ve bookData yı prop olarak yolluyoruz.
  function handleBook() {
    navigate(`/book/${idString}`, {
      state: {
        item: bookData,
      },
    });
  }

  const productData = useSelector((item) => item.book.productData);

  function handleAddToCart() {
    const existingItem = productData.find((item) => item.id === bookData.id);
    if (existingItem && existingItem.quantity >= 10) {
      toast.error(
        `You can only have a maximum of 10 of the same book in your cart`
      );
    } else {
      dispatch(
        addToCart({
          id: bookData.id,
          book_name: bookData.book_name,
          author_name: bookData.author_name,
          quantity: 1,
          price: bookData.price,
        })
      );
      toast.success(`${bookData.book_name} has been added to your cart`);
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
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default BooksCard;

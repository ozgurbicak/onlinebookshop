import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/BookSlice";
import { toast } from "react-toastify";

function BookDetails() {
  const [quantity, setQuantity] = useState(1);
  const [details, setDetails] = useState({});
  const [rating, setRating] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.book.productData);

  useEffect(() => {
    setDetails(location.state.item);
  }, [location]);

  console.log(details);
  function handleButtonPlus() {
    setQuantity(quantity < 10 ? quantity + 1 : quantity);
  }

  function handleButtonMinus() {
    setQuantity(quantity > 1 ? quantity - 1 : quantity);
  }

  function handleSetRating(rating) {
    setRating(rating);
  }

  function handleAddToCart() {
    const existingItem = productData.find((item) => item.id === details.id);
    const existingQuantity = existingItem ? existingItem.quantity : 0;

    if (existingItem && existingQuantity >= 10) {
      toast.error(
        `You can only have a maximum of 10 of the same book in your cart`
      );
    } else if (existingQuantity + quantity > details.stock) {
      toast.error(
        `You cannot add more than ${details.stock} of this book to your cart`
      );
    } else if (details.stock <= 0) {
      toast.error(`This book is out of stock`);
    } else {
      dispatch(
        addToCart({
          id: details.id,
          book_name: details.book_name,
          author_name: details.author_name,
          quantity: quantity,
          price: details.price,
          image: details.image,
        })
      );
      toast.success(
        `${quantity} "${details.book_name}" ${
          quantity === 1 ? "book" : "books"
        } has been added to your cart`
      );
    }
  }

  return (
    <div>
      <div className="max-w-screen-xl mx-auto my-10 flex gap-10">
        <div className="w-2/5 relative">
          <img
            className="w-full h-[550px] object-cover"
            src={details.image}
            alt="bookImage"
          ></img>
        </div>

        <div className="w-3/5 flex flex-col justify-center gap-12">
          <div>
            <h2 className="text-4xl font-semibold">{details.book_name}</h2>
            <p className="text-xl text-gray-600">{details.author_name}</p>
            <div className="flex items-center gap-4 mt-3">
              {details.price && (
                <p className="text-2xl font-medium text-slate-700">
                  {details.price}$
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-base">
            <div className="flex items-center">
              <StarRating
                maxRating={5}
                defaultRating={rating}
                onSetRating={handleSetRating}
              />
            </div>
            <p className="text-xs text-gray-500">(1 Customer review)</p>
          </div>
          <p className="text-base text-gray-500 -mt-3">{details.summary}</p>
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium">Quantity</p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleButtonMinus}
                className="px-3 py-1 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                -
              </button>
              <span className="px-3 py-1 text-lg font-semibold bg-gray-100 rounded-full border border-gray-300">
                {quantity}
              </span>
              <button
                onClick={handleButtonPlus}
                className="px-3 py-1 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add to Cart
            </button>
          </div>
          <p className="text-base font-medium text-gray-500">
            Categories:{" "}
            <span className="font-medium capitalize">{details.categories}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;

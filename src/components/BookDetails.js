import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { useLocation } from "react-router";

function BookDetails() {
  const [details, setDetails] = useState({});
  const [rating, setRating] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setDetails(location.state.item);
  }, [location]);

  console.log(details);

  const [quantity, setQuantity] = useState(0);

  function handleButtonPlus() {
    setQuantity(quantity < 10 ? quantity + 1 : quantity);
  }

  function handleButtonMinus() {
    setQuantity(quantity > 0 ? quantity - 1 : quantity);
  }

  function handleAddToCart() {
    console.log(`Added ${quantity} ${details.title} to cart`);
  }

  function handleSetRating(rating) {
    setRating(rating);
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
            <h2 className="text-4xl font-semibold">{details.title}</h2>
            <p className="text-xl text-gray-600">{details.author}</p>
            <div className="flex items-center gap-4 mt-3">
              {details.price && details.price.value && (
                <p className="text-2xl font-medium text-slate-700">
                  {details.price.value}$
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
        </div>
      </div>
    </div>
  );
}

export default BookDetails;

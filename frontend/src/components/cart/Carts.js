import { useDispatch, useSelector } from "react-redux";

import CartItem from "./CartItem";
import { resetCart } from "../../redux/BookSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

function Carts() {
  const productData = useSelector((state) => state.book.productData);

  const dispatch = useDispatch();

  return (
    <div className="w-2/3 pr-10">
      <div className="w-full">
        <h2 className="font-title text-2xl">Shopping Cart</h2>
        {productData.length === 0 && (
          <p className="text-center mt-4">Your cart is empty.</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {productData.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <button
        onClick={() =>
          dispatch(resetCart()) & toast.error("Your Cart is Empty ")
        }
        className="bg-red-500 text-white mt-8 ml-7 py-1 px-6 hover:bg-red-800 duration-300"
      >
        Reset Cart
      </button>
      <Link to="/">
        <button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300">
          <span>
            <HiOutlineArrowLeft />
          </span>
          go shopping
        </button>
      </Link>
    </div>
  );
}

export default Carts;

import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { deleteItem } from "../redux/BookSlice";
import { toast } from "react-toastify"; // Import toast for deletion confirmation

function CartItem() {
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
          <div key={item.id} className="rounded-lg shadow-md p-4 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdOutlineClose
                  className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300"
                  onClick={() => dispatch(deleteItem(item.id)) & toast.error()}
                />
                <img
                  className="w-40 h-40 object-cover rounded-t-lg"
                  src={item.image}
                  alt="productImg"
                />
              </div>
              <div className="flex flex-col justify-between mt-3">
                <h2 className="text-lg font-semibold">{item.book_name}</h2>
                <p className="text-sm text-gray-600">${item.price}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-2 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className="px-3 py-2 text-lg font-medium bg-white rounded-full border border-gray-300">
                  {item.quantity}
                </span>
                <button className="px-3 py-2 text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                  +
                </button>
              </div>
              <p className="text-lg font-medium">
                ${item.quantity * item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartItem;

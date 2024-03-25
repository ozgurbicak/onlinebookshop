import { useDispatch } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { deleteItem } from "../../redux/BookSlice";
import { toast } from "react-toastify"; // Import toast for deletion confirmation

function CartItem({ item }) {
  const dispatch = useDispatch();
  return (
    <div>
      <div key={item.id} className="rounded-lg shadow-md bg-white">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8">
                <MdOutlineClose
                  className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300"
                  onClick={() => {
                    dispatch(deleteItem(item.id)) &&
                      toast.error(
                        `${item.book_name} has been deleted from your cart`
                      );
                  }}
                />
              </div>
              <img
                className="w-24 h-24 object-cover rounded-lg"
                src={item.image}
                alt="productImg"
              />
            </div>
            <div className="flex flex-col justify-between ml-4">
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
            <p className="text-lg font-medium">${item.quantity * item.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

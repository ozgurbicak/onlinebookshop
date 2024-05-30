import { useSelector } from "react-redux";
import { banner } from "../assets/index";
import Carts from "../components/cart/Carts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Cart() {
  const productData = useSelector((state) => state.book.productData);
  console.log(productData);
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState("");

  useEffect(() => {
    let price = 0;
    productData.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmount(price.toFixed(2));
  }, [productData]);

  function handlePayment() {
    if (productData.length > 0) {
      navigate("/payment");
    } else {
      toast.error("Please add product to cart");
    }
  }

  return (
    <div>
      <img className="w-full h-60 object-cover" src={banner} alt="banner"></img>

      <div className="max-w-screen-xl mx-auto py-20 flex">
        <Carts />
        <div className="w-1/3 bg-white py-6 px-4">
          <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
            <h2 className="text-2xl font-medium">cart totals</h2>
            <p className="flex items-center gap-4 text-base">
              Subtotal{" "}
              <span className="font-title font-bold text-lg">
                ${totalAmount}
              </span>
            </p>
          </div>
          <p className="font-title font-semibold flex justify-between mt-6">
            Total<span className="text-xl font-bold">${totalAmount}</span>
          </p>
          <button
            onClick={handlePayment}
            className="text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300"
          >
            Proceed to payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

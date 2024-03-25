import { banner } from "../assets/index";
import Carts from "../components/cart/Carts";

function Cart() {
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
              <span className="font-title font-bold text-lg">$ 200</span>
            </p>
            <p className="flex items-start gap-4 text-base">
              Shipping{" "}
              <span>
                Lorem,ipsum dolar, sit amet consectetur adipsicing elit . Quos,
                veritatis.
              </span>
            </p>
          </div>
          <p className="font-title font-semibold flex justify-between mt-6">
            Total<span className="text-xl font-bold">$200</span>
          </p>
          <button className="text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300">
            proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

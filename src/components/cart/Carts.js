import { useSelector } from "react-redux";

import CartItem from "./CartItem";

function Carts() {
  const productData = useSelector((state) => state.book.productData);

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
    </div>
  );
}

export default Carts;

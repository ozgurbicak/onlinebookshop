import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  productData: [],
  userInfo: null,
};

export const BookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.productData.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        if (existingItem.quantity < 10) {
          const totalQuantity = existingItem.quantity + action.payload.quantity;
          existingItem.quantity = Math.min(totalQuantity, 10);

          console.log(existingItem.quantity);
        } else {
          console.log(
            toast.error(
              "You can only have a maximum of 10 of the same book in your cart"
            )
          );
        }
      } else {
        state.productData.push(action.payload);
      }
    },
    deleteItem: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
    incrementQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item.id === action.payload.id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  incrementQuantity,
  decrementQuantity,
} = BookSlice.actions;
export default BookSlice.reducer;

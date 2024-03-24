import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  userInfo: null,
};

export const BookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.productData.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
      }
    },
  },
});

export const { addToCart } = BookSlice.actions;
export default BookSlice.reducer;

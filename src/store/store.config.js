import { configureStore } from "@reduxjs/toolkit";
import reducer from "./cart/cartSlice";


export const store = configureStore({
  reducer: {
    cart: reducer,
  },
});
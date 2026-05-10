import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart"))?.items || [], // each item: { id, title, price, qty }
  totalAmount: JSON.parse(localStorage.getItem("cart"))?.totalAmount || 0,
  totalItems: JSON.parse(localStorage.getItem("cart"))?.totalItems || 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      console.log("Adding to cart:", course);
      const existing = state.items.find(i => i.id === course.id);
       
      if (!existing) {
        state.items.push(course);
        state.totalItems += 1;
        state.totalAmount += course.price;
      }else{
        state.items = state.items.filter(i => i.id !== course.id);
        state.totalItems -= 1;
        state.totalAmount -= course.price;
      }
  
      const data={
        items: state.items,
        totalAmount: state.totalAmount,
        totalItems: state.totalItems,
      }
         localStorage.setItem("cart", JSON.stringify(data));
      
     

    },

    removeFromCart: (state, action) => {
      const id = action.payload;
     
        state.items = state.items.filter(i => i.id !== id);
      
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
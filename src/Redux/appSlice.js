import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  UserInfo: null,
};

export const appSlice = createSlice({
  name: "E-commerce",
  // 1-state
  initialState,

  // 2-reducer
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push(action.payload);
      }
    },

    Increament: (state, action) => {
      const item = state.products.find((p) => p.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decreament: (state, action) => {
      const item = state.products.find((p) => p.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },

    removeAllCart: (state) => {
      state.products = [];
    },

    setUser: (state, action) => {
      state.UserInfo = action.payload;
    },

    LogOutUser: (state) => {
      state.UserInfo = null;
    },
  },
});

export const {
  addToCart,
  Increament,
  decreament,
  removeAllCart,
  removeFromCart,
  setUser,
  LogOutUser,
} = appSlice.actions;

export default appSlice.reducer;

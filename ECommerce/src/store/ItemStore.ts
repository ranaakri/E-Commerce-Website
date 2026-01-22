import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Product } from "../components/ProductCard";

const initialState: Product[] = [];

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProductList: (state, action: PayloadAction<Product[]>) => {
      const newItem = action.payload;
      state.concat(newItem)
    },

    addProduct: (state,action: PayloadAction<Product> ) => {
        const newItem = action.payload;
        const existingItem = state.find((item) => item.id === newItem.id);

        if(!existingItem)
            [...state, newItem]
    }
  },
});

export const { addProduct, addProductList } = productSlice.actions;

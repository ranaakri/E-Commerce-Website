import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Product } from "../components/ProductCard";
import { productSlice } from "./ItemStore";

interface ICartItem {
  product: number;
  isCustomized: boolean;
  Customization: string | undefined;
  count: number;
}

interface Customization {
  id: number;
  customization: string;
}

const initialState: ICartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<number>) => {
      const newItem = action.payload;
      const existingItem = state.find((item) => item.product === newItem);

      if (existingItem) {
        existingItem.count++;
      } else {
        state.push({
          product: newItem,
          count: 1,
          isCustomized: false,
          Customization: undefined,
        });
      }
    },

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItem = state.find((item) => item.product === id);

      if (existingItem) {
        if (existingItem.count === 1) {
          return state.filter((item) => item.product !== id);
        } else {
          existingItem.count--;
        }
      }
    },

    setCustomization: (state, action: PayloadAction<Customization>) => {
      const id = action.payload.id;
      const existingItem = state.find((item) => item.product === id);

      if (existingItem) {
        existingItem.Customization = action.payload.customization;
        existingItem.isCustomized = true;
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, setCustomization } =
  cartSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    product: productSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

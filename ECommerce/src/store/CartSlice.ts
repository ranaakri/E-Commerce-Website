// import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { Product } from '../components/ProductCard';

// interface ICartItem {
//   product: Product;
//   count: number;
// }

// const initialState: ICartItem[] = [];

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addItemToCart: (state, action: PayloadAction<Product>) => {
//       const newItem = action.payload;
//       const existingItem = state.find(item => item.product.id === newItem.id);

//       if (existingItem) {
//         existingItem.count++;
//       } else {
//         state.push({ product: newItem, count: 1 });
//       }
//     },

//     removeItemFromCart: (state, action: PayloadAction<number>) => {
//       const id = action.payload;
//       const existingItem = state.find(item => item.product.id === id);

//       if (existingItem) {
//         if (existingItem.count === 1) {
//           return state.filter(item => item.product.id !== id);
//         } else {
//           existingItem.count--;
//         }
//       }
//     },
//   },
// });

// export const { addItemToCart, removeItemFromCart } = cartSlice.actions;

// export const store = configureStore({
//   reducer: {
//     cart: cartSlice.reducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
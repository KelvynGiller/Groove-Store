import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/CartSlice';
import checkoutReducer from './slices/CheckoutSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    checkout: checkoutReducer,
  },
});

export default store;

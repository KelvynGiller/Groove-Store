import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/cart';

const fetchOrCreateCart = async (userId, token) => {
  const response = await axios.post(
    `${API_URL}/create-or-get`,
    { user_id: userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.cart_id;
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const cartId = await fetchOrCreateCart(userId, token);
      const response = await axios.get(`${API_URL}/${cartId}/items`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { cart_id: cartId, items: response.data.items };
    } catch (error) {
      console.error("fetchCart error:", error);
      const errMsg =
        error.response && error.response.data
          ? error.response.data.message || JSON.stringify(error.response.data)
          : error.message;
      return rejectWithValue(errMsg);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, product_id, name, price, quantity, token }, { rejectWithValue }) => {
    try {
      console.log('Adding to cart with price:', price, 'and quantity:', quantity);
      if (isNaN(price) || price <= 0) return rejectWithValue('Invalid product price');
      if (isNaN(quantity) || quantity <= 0) quantity = 1;
      const cartId = await fetchOrCreateCart(userId, token);
      const response = await axios.post(
        `${API_URL}/${cartId}/add-product`,
        { product_id, name, price, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Response from adding product to cart:', response.data);
      if (!response.data || !response.data.product) {
        return rejectWithValue('Failed to add product to cart');
      }
      return response.data.product;
    } catch (error) {
      console.error('Error adding product to cart:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, product_id, token }, { rejectWithValue }) => {
    try {
      const cartId = await fetchOrCreateCart(userId, token);
      await axios.delete(`${API_URL}/${cartId}/remove-product`, {
        data: { product_id },
        headers: { Authorization: `Bearer ${token}` },
      });
      return product_id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const cartId = await fetchOrCreateCart(userId, token);
      await axios.delete(`${API_URL}/${cartId}/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  cart_id: null,
  items: [],
  totalAmount: 0,
  status: 'idle',
  error: null,
};

const calculateTotal = (items) => {
  return items.reduce((sum, item) => {
    const itemPrice = isNaN(item.price) ? 0 : item.price;
    const itemQuantity = isNaN(item.quantity) ? 1 : item.quantity;
    return sum + itemPrice * itemQuantity;
  }, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart_id = action.payload.cart_id;
        state.items = action.payload.items || [];
        state.totalAmount = calculateTotal(action.payload.items || []);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        console.log('Added item to cart:', action.payload);
        state.status = 'succeeded';
        const existingItem = state.items.find(
          (item) => item.product_id === action.payload.product_id
        );
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
        state.totalAmount = calculateTotal(state.items);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.product_id !== action.payload
        );
        state.totalAmount = calculateTotal(state.items);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.totalAmount = 0;
      });
  },
});

export default cartSlice.reducer;
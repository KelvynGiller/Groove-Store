import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchOrderDetails = createAsyncThunk(
  "checkout/fetchOrderDetails",
  async ({ orderId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/details/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error in fetchOrderDetails:", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to fetch order details");
    }
  }
);

export const processPayment = createAsyncThunk(
  "checkout/processPayment",
  async ({ orderId, amount, paymentInfo }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders/create-payment-intent`, {
        order_id: orderId,
        amount,
        paymentInfo,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Payment processing failed");
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    order: { items: [] },
    status: "idle",
    error: null,
    paymentStatus: "idle",
    paymentError: null,
  },
  reducers: {
    clearCheckout: (state) => {
      state.order = { items: [] };
      state.status = "idle";
      state.error = null;
      state.paymentStatus = "idle";
      state.paymentError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload || { items: [] };
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(processPayment.pending, (state) => {
        state.paymentStatus = "loading";
      })
      .addCase(processPayment.fulfilled, (state) => {
        state.paymentStatus = "succeeded";
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.paymentStatus = "failed";
        state.paymentError = action.payload;
      });
  },
});

export const { clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

const initialState = {
  bookings: [],
  isError: false,
  isSuccess: false,
  isBookingSuccess: false,
  isLoading: false,
  message: "",
  url: "",
  payment: false,
};

export const createBooking = createAsyncThunk(
  "booking/create",
  async (value, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.createBooking(value, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const bookingPayment = createAsyncThunk(
  "booking/payment",
  async (value, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.bookingPayment(value, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBookingsById = createAsyncThunk(
  "bookings/listAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.getBookingsById(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    reset: (state) => initialState,
    payment: (state, action) => {
      state.payment = true;
    },
    paymentFalse: (state, action) => {
      state.payment = false;
    },
    bookingFalse: (state, action) => {
      state.isBookingSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isBookingSuccess = true;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(bookingPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookingPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.url = action.payload.url;
      })
      .addCase(bookingPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBookingsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookingsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(getBookingsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, payment, paymentFalse, bookingFalse } =
  bookingSlice.actions;
export default bookingSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import busService from "./busService";

const initialState = {
  buses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  bus: {},
  updatedBus: {},
};

export const listBuses = createAsyncThunk(
  "buses/listall",
  async (pageNumber = "", thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await busService.listBuses(pageNumber, token);
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

export const createBus = createAsyncThunk(
  "buses/create",
  async (values, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await busService.createBus(values, token);
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

export const ListBusDetails = createAsyncThunk(
  "buses/details",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await busService.ListBusDetails(id, token);
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

export const updateBus = createAsyncThunk(
  "buses/edit",
  async (value, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return busService.updateBus(value, token);
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

export const deleteBus = createAsyncThunk(
  "Bus/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await busService.deleteBus(id, token);
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

export const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.buses.push(action.payload);
      })
      .addCase(createBus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(listBuses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listBuses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.buses = action.payload.buses;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
      })
      .addCase(listBuses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(ListBusDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ListBusDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bus = action.payload;
      })
      .addCase(ListBusDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateBus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedBus = action.payload;
      })
      .addCase(updateBus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.buses = state.buses.filter(
          (bus) => bus._id !== action.payload.id
        );
      })
      .addCase(deleteBus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = busSlice.actions;
export default busSlice.reducer;

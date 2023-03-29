import axios from "axios";
import { message } from "antd";
const API_URL = "/api/bookings/";

const createBooking = async (value, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "book-seat", value, config);
  if (response.data) {
    message.success("Booked Successfully");
  }
  return response.data;
};

const bookingPayment = async (value, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "make-payments", value, config);
  return response.data;
};

const getBookingsById = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "myBookings", config);
  return response.data;
};

const bookingService = {
  createBooking,
  bookingPayment,
  getBookingsById,
};

export default bookingService;

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
    message.success("Booking Created");
  }
  return response.data;
};

const bookingPayment = async (value, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "make-payment", value, config);
  if (response.success) {
    message.success(response.message);
  }
  return response.data;
};

const bookingService = {
  createBooking,
  bookingPayment,
};

export default bookingService;

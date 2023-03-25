import axios from "axios";
import { message } from "antd";
const API_URL = "/api/buses/";

export const listBuses = async (pageNumber = "", token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`/api/buses?pageNumber=${pageNumber}`, config);

  return response.data;
};

const createBus = async (values, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, values, config);
  if (response.data) {
    message.success("Bus Created");
  }
  return response.data;
};

export const ListBusDetails = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + id, config);
  return response.data;
};

export const updateBus = async (value, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + "update", value, config);
  return response.data;
};

export const deleteBus = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

const busService = {
  listBuses,
  createBus,
  ListBusDetails,
  updateBus,
  deleteBus,
};

export default busService;

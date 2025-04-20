import axios from "axios";
import { API_ROUTES } from "../utils/routes";

export const addUser = async (payload: any) => {
  const response = await axios.post(`${API_ROUTES.CREATE_ACCOUNT}`, payload);
  return response.data;
};

export const loginUser = async (payload: any) => {
  const response = await axios.post(`${API_ROUTES.LOGIN}`, payload);
  return response.data;
};

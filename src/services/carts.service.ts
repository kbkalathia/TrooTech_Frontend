import axios from "axios";
import { API_ROUTES } from "../utils/routes";

export const getCartDetails = async (userId: number) => {
  const response = await axios.get(`${API_ROUTES.CART_DETAILS}/${userId}`);
  return response.data;
};

export const addToCart = async (userId: number, payload: any) => {
  const response = await axios.post(
    `${API_ROUTES.ADD_TO_CART}/${userId}`,
    payload
  );
  return response.data;
};

export const deleteCart = async (cartId: number) => {
  const response = await axios.delete(`${API_ROUTES.DELETE_CART}/${cartId}`);
  return response.data;
};

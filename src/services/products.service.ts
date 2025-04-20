import axios from "axios";
import { API_ROUTES } from "../utils/routes";

export const getAllProducts = async () => {
  const response = await axios.get(API_ROUTES.GET_ALL_PRODUCTS);
  return response.data;
};

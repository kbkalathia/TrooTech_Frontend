import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/products.service";

export function useGetAllProducts() {
  return useQuery({
    queryKey: ["productsList"],
    queryFn: () => getAllProducts(),
  });
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  deleteCart,
  getCartDetails,
} from "../services/carts.service";
import toast from "react-hot-toast";
import { useCart } from "../contexts/cart.context";

export function useGetCartDetails(userId: number) {
  return useQuery({
    queryKey: ["cartList"],
    queryFn: () => getCartDetails(userId),
    staleTime: 0,
  });
}

export function useAddToCart(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => addToCart(userId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cartList"] });
      toast.dismiss();
      toast.success(data.message);
    },
    onError: (error) => {
      console.error("Failed to add blog:", error);
    },
  });
}

export function useDeleteCart() {
  const queryClient = useQueryClient();
  const { setUpdateProductCards } = useCart();

  return useMutation({
    mutationFn: (cartId: number) => deleteCart(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartList"] });
      setUpdateProductCards(true);
    },
    onError: (error) => {
      console.error("Failed to add blog:", error);
    },
  });
}

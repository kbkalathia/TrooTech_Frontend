import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addUser, loginUser } from "../services/users.service";

export function useRegister() {
  return useMutation({
    mutationFn: (payload: any) => addUser(payload),
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(data.message);
    },
    onError: (error) => {
      console.error("Failed to add user:", error);
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (payload: any) => loginUser(payload),
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error("Invalid Credentials");
      console.error("Failed to login:", error);
    },
  });
}

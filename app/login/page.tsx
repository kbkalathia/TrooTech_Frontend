"use client";
import React from "react";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/src/validators/auth.schema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLogin } from "@/src/hooks/useAuth.hook";
import { setToLocalStorage } from "@/src/utils/helpers";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { mutate: loginUser } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    const { email, password } = data;
    const payload = {
      email,
      password,
    };

    loginUser(payload, {
      onSuccess: (data: any) => {
        setToLocalStorage({
          token: data?.data?.user?.token,
          userId: data?.data?.user?.id,
        });

        router.push("/products");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Login
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            {...register("email")}
            className="w-full px-4 py-2 border rounded mt-1 text-black"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-2 border rounded mt-1 text-black"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link href="/create-account">
            <span className="text-blue-600 hover:underline">Sign up</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

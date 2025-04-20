"use client";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/src/validators/auth.schema";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRegister } from "@/src/hooks/useAuth.hook";
import { useRouter } from "next/navigation";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

const CreateAccount: React.FC = () => {
  const router = useRouter();
  const { mutate: addUser } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    const { name, email, password } = data;
    const payload = {
      name,
      email,
      password,
    };

    addUser(payload, {
      onSuccess: () => {
        router.push("/login");
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
          Register
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            {...register("name")}
            className="w-full px-4 py-2 border rounded mt-1 text-black"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

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
          Register
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-600 hover:underline">Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;

"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../src/styles/globals.css";
import ContextProviders from "@/src/contexts/index.context";
import ErrorBoundary from "@/src/components/ErrorBoundary";
import ReactQueryProvider from "@/src/providers/QueryProvider";
import { io } from "socket.io-client";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Toast from "@/src/components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      path: "/socket.io",
      transports: ["websocket"],
    });

    socketInstance.on("product-added", () => {
      toast.success("New Product Added");
    });

    socketInstance.on("product-updated", () => {
      toast.success("Product Updated");
    });

    socketInstance.on("product-removed", () => {
      toast.success("Product Removed");
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <ReactQueryProvider>
            <ContextProviders>{children}</ContextProviders>
          </ReactQueryProvider>
        </ErrorBoundary>
        <Toast />
      </body>
    </html>
  );
}

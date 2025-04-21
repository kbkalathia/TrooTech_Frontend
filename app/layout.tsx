import { Geist, Geist_Mono } from "next/font/google";
import "../src/styles/globals.css";
import ContextProviders from "@/src/contexts/index.context";
import ErrorBoundary from "@/src/components/ErrorBoundary";
import ReactQueryProvider from "@/src/providers/QueryProvider";
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

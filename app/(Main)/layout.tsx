import Toast from "@/src/components/Toast";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex h-screen w-screen">{children}</body>
      <Toast />
    </html>
  );
}

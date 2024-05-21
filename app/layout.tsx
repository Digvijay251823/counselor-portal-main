import type { Metadata } from "next";
import "./globals.css";
import GlobalStateManager from "@/Components/context/GlobalStateManager";
import Toast from "@/Components/context/Toast";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalStateManager>
          {children} <Toast />
        </GlobalStateManager>
      </body>
    </html>
  );
}

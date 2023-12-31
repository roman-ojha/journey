"use client";
import { Inter } from "next/font/google";
import "@/styles/base/reset.scss";
import "@/styles/base/global.scss";
import "@/types/CssVariables";
import { useState, useEffect } from "react";
import useGetTheme from "@/hooks/useGetTheme";
import NavBar from "@/components/NavBar";
import ShadeGradient from "@/components/ShadeGradient";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useGetTheme();

  useEffect(() => {
    if (theme.value == "dark") {
      document.body.classList.add("dark-mode");
      setIsLoading(false);
    } else if (theme.value == "light") {
      document.body.classList.add("light-mode");
      setIsLoading(false);
    }
  }, [theme]);

  if (isLoading) {
    return (
      <html lang="en">
        <body className={inter.className}></body>
      </html>
    );
  }
  console.log("hello");

  return (
    <html lang="en">
      <body className={inter.className}>
        <ShadeGradient />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

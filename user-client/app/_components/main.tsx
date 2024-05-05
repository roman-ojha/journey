"use client";
import { useState, useEffect } from "react";
import useGetTheme from "@/hooks/useGetTheme";
import ShadeGradient from "@/components/ShadeGradient";
import StoreProvider from "./storeProvider";
// import useGetAuthUserQuery from "@/hooks/reactQuery/useGetAuthUserQuery";
import AppQueryClientProvider from "./appQueryClientProvider";

export default function Main({ children }: { children: React.ReactNode }) {
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
    return <></>;
  }

  return (
    <>
      <ShadeGradient />
      <StoreProvider>
        <AppQueryClientProvider>{children}</AppQueryClientProvider>
      </StoreProvider>
    </>
  );
}

"use client";
import { Inter } from "next/font/google";
import "../styles/base/reset.scss";
import NavBar from "@/components/NavBar";
import { useState, useEffect } from "react";
import ShadeGradient from "@/components/ShadeGradient";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
const noNavbarForRoutes = ["/login", "/register"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const localStorageModeKey = "theme-mode";
  const [isLoading, setIsLoading] = useState(true);
  const pathName = usePathname();

  // console.log(themeMode);

  useEffect(() => {
    const lThemeMode = localStorage.getItem(
      localStorageModeKey
    ) as ThemeMode | null;
    if (
      lThemeMode == null ||
      (lThemeMode !== "dark" && lThemeMode !== "light")
    ) {
      // set theme mode from system value
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      if (darkThemeMq.matches) {
        // system have dark mode
        const modeValue: ThemeMode = "dark";
        localStorage.setItem(localStorageModeKey, modeValue);
        setThemeMode("dark");
      } else {
        const modeValue: ThemeMode = "light";
        localStorage.setItem(localStorageModeKey, modeValue);
        setThemeMode("light");
      }
    } else if (lThemeMode == "dark") {
      document.body.classList.add("dark-mode");
      setThemeMode("dark");
      setIsLoading(false);
    } else if (lThemeMode == "light") {
      document.body.classList.add("light-mode");
      setThemeMode("light");
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <html lang="en">
        <body className={inter.className}></body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        {!noNavbarForRoutes.includes(pathName) && (
          <>
            <ShadeGradient />
            <NavBar
              theme={themeMode}
              setTheme={setThemeMode}
              localStorageModeKey={localStorageModeKey}
            />
          </>
        )}
        {children}
      </body>
    </html>
  );
}

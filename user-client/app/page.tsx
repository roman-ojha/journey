"use client";
import NavBar from "@/components/NavBar";
import { useState, useEffect } from "react";

type ThemeMode = "light" | "dark";

export default function Home() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");
  const localStorageModeKey = "theme-mode";
  const [isLoading, setIsLoading] = useState(true);

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

  const changeMode = () => {
    let modeValue: ThemeMode;
    if (themeMode == "light") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      modeValue = "dark";
      setThemeMode("dark");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      modeValue = "light";
      setThemeMode("light");
    }
    localStorage.setItem(localStorageModeKey, modeValue);
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <main>
      <NavBar />
      <button onClick={changeMode}>Change Mode</button>
      <h1>Home page</h1>
    </main>
  );
}

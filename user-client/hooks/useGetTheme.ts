import { useEffect } from "react";

const useGetTheme = () => {
  const localStorageModeKey = "theme-mode";
  let lThemeMode =
    typeof window !== "undefined"
      ? (localStorage.getItem(localStorageModeKey) as ThemeMode)
      : null;
  if (lThemeMode == null || (lThemeMode !== "dark" && lThemeMode !== "light")) {
    // set theme mode from system value
    const darkThemeMq =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : null;
    let modeValue: ThemeMode;
    if (!darkThemeMq)
      return {
        key: localStorageModeKey,
        value: null,
      };
    if (darkThemeMq.matches) {
      // system have dark mode
      modeValue = "dark";
      localStorage.setItem(localStorageModeKey, modeValue);
    } else {
      modeValue = "light";
      localStorage.setItem(localStorageModeKey, modeValue);
    }
    lThemeMode = modeValue;
  }
  return {
    key: localStorageModeKey,
    value: lThemeMode,
  };
};

export default useGetTheme;

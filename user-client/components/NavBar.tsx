"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  theme: ThemeMode;
  setTheme: Dispatch<SetStateAction<ThemeMode>>;
  localStorageModeKey: string;
}

const NavBar: React.FC<Props> = ({
  theme,
  setTheme,
  localStorageModeKey,
}): React.JSX.Element => {
  const changeMode = () => {
    let modeValue: ThemeMode;
    if (theme == "light") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      modeValue = "dark";
      setTheme("dark");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      modeValue = "light";
      setTheme("light");
    }
    localStorage.setItem(localStorageModeKey, modeValue);
  };
  return (
    <>
      <button onClick={changeMode}>Change Mode</button>
    </>
  );
};

export default NavBar;

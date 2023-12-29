"use client";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import appIcon from "@/assets/images/appIcon.png";
import styles from "@/styles/components/navbar.module.scss";

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
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo_container}>
        <Image
          src={appIcon}
          alt="app icon"
          className={styles.navbar__logo_container__logo}
        />
        <h5 className={styles.navbar__logo_container__text}>Journey</h5>
      </div>
      <ul className={styles.navbar__nav_list}>
        <li>Explorer</li>
        <li>About Us</li>
        <li>Contact</li>
        <li>Be Merchant</li>
      </ul>
      <div className={styles.navbar__right_part}>
        <button className={styles.login_button}>Login</button>
        <button className={styles.sign_up_button}>Sign Up</button>
      </div>
    </nav>
  );
};

export default NavBar;

"use client";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import appIcon from "@/assets/images/appIcon.png";
import styles from "@/styles/components/navbar.module.scss";
// import { Icon } from "@iconify/react";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathName = usePathname();

  // useEffect(() => {
  //   console.log(theme);
  //   if (theme == "dark") {
  //     // themeSwitcher.current?.classList.remove(styles.theme_switcher_light);
  //     // themeSwitcher.current?.classList.add(styles.theme_switcher_dark);
  //     (themeSwitcher.current as HTMLButtonElement).style.justifyContent =
  //       "flex-end";
  //   } else {
  //     // themeSwitcher.current?.classList.remove(styles.theme_switcher_dark);
  //     // themeSwitcher.current?.classList.add(styles.theme_switcher_light);
  //     (themeSwitcher.current as HTMLButtonElement).style.justifyContent =
  //       "flex-start";
  //   }
  // }, [theme]);

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
    <section className={styles.container}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navbar__logo_container}>
          <Image
            src={appIcon}
            alt="app icon"
            className={styles.navbar__logo_container__logo}
          />
          <h5 className={styles.navbar__logo_container__text}>Journey</h5>
        </Link>
        <ul className={styles.navbar__nav_list}>
          <li>
            <Link
              href="/explore"
              className={
                pathName === "/explore" ? styles.navbar__nav_list__active : ""
              }
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              href="/about-us"
              className={
                pathName === "/about-us" ? styles.navbar__nav_list__active : ""
              }
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={
                pathName === "/contact" ? styles.navbar__nav_list__active : ""
              }
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/be-merchant"
              className={
                pathName === "/be-merchant"
                  ? styles.navbar__nav_list__active
                  : ""
              }
            >
              Be Merchant
            </Link>
          </li>
        </ul>
        <div className={styles.navbar__right_part}>
          {/* <button
          id="theme-switcher"
          className={styles.theme_switcher}
          ref={themeSwitcher}
          onClick={changeMode}
        >
          <span className={styles.theme_switcher__theme_container}>
            {theme == "dark" ? (
              <Icon
                icon="tdesign:mode-dark"
                className={styles.theme_switcher__theme_container__icon}
              />
            ) : (
              <Icon
                icon="entypo:light-up"
                className={styles.theme_switcher__theme_container__icon}
              />
            )}
          </span>
        </button> */}
          {/* <label className={styles.switch}>
          <input type={styles.checkbox} />
          <span className={styles.slider}></span>
        </label> */}
          <ThemeSwitcher
            sx={{ m: 1 }}
            onClick={changeMode}
            defaultChecked={theme == "dark" ? true : false}
          />
          <Link href="/login" className={styles.login_button}>
            Login
          </Link>
          <Link href="/register" className={styles.sign_up_button}>
            Sign Up
          </Link>
        </div>
      </nav>
      <div className={styles.navbar_divider}></div>
    </section>
  );
};

export default NavBar;

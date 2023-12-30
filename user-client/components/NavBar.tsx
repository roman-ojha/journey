"use client";
import React from "react";
import Image from "next/image";
import appIcon from "@/assets/images/appIcon.png";
import styles from "@/styles/components/navbar.module.scss";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = (): React.JSX.Element => {
  const pathName = usePathname();

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
          <ThemeSwitcher />
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

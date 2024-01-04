"use client";
import React from "react";
import styles from "@/styles/components/navbar.module.scss";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./buttons/Button";
import Logo from "./Logo";
import { NO_NAVBAR_FOR_ROUTES } from "@/data/constants";
import AppLink from "./buttons/AppLink";

const NavBar = (): React.JSX.Element => {
  const pathName = usePathname();

  if (NO_NAVBAR_FOR_ROUTES.includes(pathName)) {
    return <></>;
  }

  return (
    <section className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navbar__logo}>
          <Logo />
        </div>
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
          <AppLink
            backgroundColor="transparent"
            href="/login"
            width="content-width"
          >
            Login
          </AppLink>
          <AppLink
            backgroundColor="primary"
            width="content-width"
            href="/register"
          >
            Sign Up
          </AppLink>
        </div>
      </nav>
      <div className={styles.navbar_divider}></div>
    </section>
  );
};

export default NavBar;

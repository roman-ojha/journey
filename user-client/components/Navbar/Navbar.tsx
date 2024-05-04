"use client";
import React from "react";
import styles from "@/styles/components/navbar.module.scss";
import ThemeSwitcher from "./ThemeSwitcher";
import { usePathname } from "next/navigation";
import AppLogo from "@/components/Logo";
import { NO_NAVBAR_FOR_ROUTES } from "@/data/constants";
import NavbarLinks from "./NavbarLinks";
import AuthActionCenter from "./AuthActionCenter";

const NavBar = (): React.JSX.Element => {
  const pathName = usePathname();

  if (NO_NAVBAR_FOR_ROUTES.includes(pathName)) {
    return <></>;
  }

  return (
    <section className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navbar__logo}>
          <AppLogo />
        </div>
        <NavbarLinks pathName={pathName} />
        <div className={styles.navbar__right_part}>
          <ThemeSwitcher />
          <AuthActionCenter />
        </div>
      </nav>
      <div className={styles.navbar_divider}></div>
    </section>
  );
};

export default NavBar;

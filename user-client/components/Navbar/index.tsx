import React from "react";
import styles from "@/styles/components/navbar.module.scss";
import ThemeSwitcher from "./ThemeSwitcher";
import AppLogo from "@/components/Logo";
import NavbarLinks from "./NavbarLinks";
import AuthActionCenter from "./AuthActionCenter";
import NavBar from "./Navbar";

const NavbarIndex = (): React.JSX.Element => {
  return (
    <>
      <NavBar>
        <section className={styles.container}>
          <nav className={styles.navbar}>
            <div className={styles.navbar__logo}>
              <AppLogo />
            </div>
            <NavbarLinks />
            <div className={styles.navbar__right_part}>
              <ThemeSwitcher />
              <AuthActionCenter />
            </div>
          </nav>
          <div className={styles.navbar_divider}></div>
        </section>
      </NavBar>
    </>
  );
};

export default NavbarIndex;

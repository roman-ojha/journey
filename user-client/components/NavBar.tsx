"use client";
import React, { useEffect } from "react";
import styles from "@/styles/components/navbar.module.scss";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./buttons/Button";
import Logo from "./Logo";
import { AUTH_USER_COOKIE_NAME, NO_NAVBAR_FOR_ROUTES } from "@/data/constants";
import AppLink from "./buttons/AppLink";
import useGetAuthUserQuery from "@/hooks/reactQuery/useGetAuthUserQuery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { eraseCookie, getCookie } from "@/lib/cookie";
import { useRouter } from "next/navigation";

const NavBar = (): React.JSX.Element => {
  const pathName = usePathname();
  const router = useRouter();

  const { data, isSuccess, isError, refetch, isLoading } = useGetAuthUserQuery({
    retry: false,
  });

  const handleLogout = () => {
    eraseCookie(AUTH_USER_COOKIE_NAME);
    refetch();
  };

  if (NO_NAVBAR_FOR_ROUTES.includes(pathName) || isLoading) {
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
          {isError ? (
            <>
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
            </>
          ) : null}
          {isSuccess ? (
            <>
              <Button
                backgroundColor="primary"
                width="content-width"
                onClick={handleLogout}
              >
                Logout
              </Button>
              <Avatar
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  router.push("/profile");
                }}
              >
                <AvatarImage src={data.data.picture} />
                <AvatarFallback className="capitalize bg-secondary w-9 h-9 text-xs">
                  RO
                </AvatarFallback>
              </Avatar>
            </>
          ) : null}
        </div>
      </nav>
      <div className={styles.navbar_divider}></div>
    </section>
  );
};

export default NavBar;

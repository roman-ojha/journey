"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/components/navbar.module.scss";

const NavbarLinks = () => {
  const pathName = usePathname();
  return (
    <>
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
              pathName === "/be-merchant" ? styles.navbar__nav_list__active : ""
            }
          >
            Be Merchant
          </Link>
        </li>
      </ul>
    </>
  );
};

export default NavbarLinks;

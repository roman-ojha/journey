"use client";
import SearchingSVG from "@/assets/svgs/searching.svg";
import Image from "next/image";
import styles from "@/styles/components/Home/searchBox.module.scss";

const SearchBox = (): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <Image src={SearchingSVG} alt="searching" className={styles.image} />
      <div className={styles.container__divider}></div>
      <form></form>
    </div>
  );
};

export default SearchBox;

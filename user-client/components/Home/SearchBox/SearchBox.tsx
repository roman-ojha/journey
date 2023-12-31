"use client";
import SearchingSVG from "@/assets/svgs/searching.svg";
import Image from "next/image";
import styles from "@/styles/components/Home/searchBox.module.scss";

import { Icon } from "@iconify/react";
import { useState } from "react";
import Button from "@/components/Button";
import DatePicker from "./DatePicker";

const SearchBox = (): React.JSX.Element => {
  return (
    <div className={styles.container} id="search-box">
      <Image src={SearchingSVG} alt="searching" className={styles.image} />
      <div className={styles.container__divider}></div>
      <DatePicker />
    </div>
  );
};

export default SearchBox;

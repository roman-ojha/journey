"use client";
import { Icon } from "@iconify/react";
import styles from "@/styles/page/explore/cardHeader.module.scss";
import { useState } from "react";

const ChangeCardLayout = (): React.JSX.Element => {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  return (
    <>
      <div className={styles.card_layout}>
        <Icon
          icon="ion:grid"
          className={`${styles.card_layout__icon} ${
            layout == "grid" ? styles.card_layout__icon__active : null
          }`}
          onClick={() => {
            setLayout("grid");
          }}
        />
        <Icon
          icon="ion:list-sharp"
          className={`${styles.card_layout__icon} ${
            layout == "list" ? styles.card_layout__icon__active : null
          }`}
          onClick={() => {
            setLayout("list");
          }}
        />
      </div>
    </>
  );
};

export default ChangeCardLayout;

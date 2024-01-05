"use client";
import { Icon } from "@iconify/react";
import styles from "@/styles/page/explore/cardHeader.module.scss";
import exploreStyle from "@/styles/page/explore/index.module.scss";
import vehicleCardStyles from "@/styles/components/vehicleCard.module.scss";
import { useEffect, useState } from "react";

const ChangeCardLayout = (): React.JSX.Element => {
  const [layout, setLayout] = useState<"grid" | "list">("list");
  // useEffect(() => {
  //   if (layout == "list") {
  //     document
  //       .getElementsByClassName(exploreStyle.card_container)[0]
  //       .classList.add(exploreStyle.card_container_list_view);
  //     document
  //       .getElementsByClassName(exploreStyle.card_container)[0]
  //       .classList.remove(exploreStyle.card_container_grid_view);
  //   } else {
  //     document
  //       .getElementsByClassName(exploreStyle.card_container)[0]
  //       .classList.remove(exploreStyle.card_container_list_view);
  //     document
  //       .getElementsByClassName(exploreStyle.card_container)[0]
  //       .classList.add(exploreStyle.card_container_grid_view);
  //   }
  // }, [layout]);
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

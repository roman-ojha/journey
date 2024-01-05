"use client";
import { Icon } from "@iconify/react";
import styles from "@/styles/page/explore/cardHeader.module.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { setVehicleCardLayout } from "@/services/store/features/vehicleCardLayout/vehicleCardLayoutSlice";
import { useDispatch } from "react-redux";

const ChangeCardLayout = (): React.JSX.Element => {
  const [layout, setLayout] = useState<"grid" | "list">("list");
  const vehicleCardLayout = useAppSelector((state) => state.vehicleCardLayout);
  const dispatch = useAppDispatch();

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
            vehicleCardLayout.layout == "grid"
              ? styles.card_layout__icon__active
              : null
          }`}
          onClick={() => {
            dispatch(setVehicleCardLayout("grid"));
          }}
        />
        <Icon
          icon="ion:list-sharp"
          className={`${styles.card_layout__icon} ${
            vehicleCardLayout.layout == "list"
              ? styles.card_layout__icon__active
              : null
          }`}
          onClick={() => {
            dispatch(setVehicleCardLayout("list"));
          }}
        />
      </div>
    </>
  );
};

export default ChangeCardLayout;

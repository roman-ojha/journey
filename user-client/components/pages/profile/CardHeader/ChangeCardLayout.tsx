"use client";
import { Icon } from "@iconify/react";
import styles from "@/styles/page/explore/cardHeader.module.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { setVehicleCardLayout } from "@/services/store/features/vehicleCardLayout/vehicleCardLayoutSlice";
import { useDispatch } from "react-redux";

const ChangeCardLayout = (): React.JSX.Element => {
  return (
    <>
      <div className={styles.card_layout}>
        <Icon icon="ion:grid" className={`${styles.card_layout__icon}`} />
        <Icon
          icon="ion:list-sharp"
          className={`${styles.card_layout__icon} ${styles.card_layout__icon__active}`}
        />
      </div>
    </>
  );
};

export default ChangeCardLayout;

"use client";
import styles from "@/styles/components/footer/available-on.module.scss";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface Props {
  type: "app-store" | "google-store";
}

const AppDownloadOn: React.FC<Props> = ({ type }): React.JSX.Element => {
  return (
    <Link
      className={styles.app_download_on}
      href={
        type == "app-store"
          ? "https://www.apple.com/app-store/"
          : "https://play.google.com/store/games?device=windows"
      }
      target="_blank"
    >
      <Icon
        icon={type == "app-store" ? "ic:baseline-apple" : "mdi:google-play"}
        className={styles.app_download_on__icon}
      />
      <span className={styles.app_download_on__text_container}>
        <p>Download on</p>
        <h6>{type == "app-store" ? "App Store" : "Google Play"}</h6>
      </span>
    </Link>
  );
};

export default AppDownloadOn;

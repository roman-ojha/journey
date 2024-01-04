"use client";
import Image from "next/image";
import styles from "@/styles/components/vehicleCard.module.scss";
import { Icon } from "@iconify/react";
import Link from "next/link";

const VehicleCard = (): React.JSX.Element => {
  return (
    <Link href="" className={styles.container}>
      <div className={styles.card_image_container}>
        <Image
          src="https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="vehicle"
          width={500}
          height={500}
          className={styles.card_image}
        />
      </div>
      <div className={styles.card_info}>
        <h6 className={styles.card_title}>
          Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)
        </h6>
        <div className={styles.card_rating_review}>
          <span className={styles.card_rating}>
            <Icon
              icon="typcn:star-full-outline"
              className={styles.card_rating__icon}
            />
            <Icon
              icon="typcn:star-full-outline"
              className={styles.card_rating__icon}
            />
            <Icon
              icon="typcn:star-full-outline"
              className={styles.card_rating__icon}
            />
            <Icon
              icon="typcn:star-full-outline"
              className={styles.card_rating__icon}
            />
            <Icon
              icon="ic:round-star-half"
              className={styles.card_rating__icon}
            />
          </span>
          <p>20,433</p>
        </div>
        <div className={styles.card_departure_at}>
          <Icon
            icon="carbon:time-filled"
            className={styles.card_departure_at__icon}
          />
          <p data-card-p="key">Departure AT:</p>
          <p data-card-p="value">15 DEC, 6:00 AM</p>
        </div>
        <div className={styles.card_price}>
          <Icon icon="raphael:dollar" className={styles.card_price__icon} />
          <p data-card-p="key">Price</p>
          <p data-card-p="value">NRS. 1500/-</p>
        </div>
        <div className={styles.card_vehicle_type}>
          <Icon
            icon="fluent:vehicle-cab-16-filled"
            className={styles.card_vehicle_type__icon}
          />
          <p data-card-p="key">Vehicle Type:</p>
          <p data-card-p="value">Deluxe Bus</p>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;

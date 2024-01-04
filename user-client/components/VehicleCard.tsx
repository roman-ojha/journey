"use client";
import Image from "next/image";
import styles from "@/styles/components/vehicleCard.module.scss";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect } from "react";
import { RatingStar, generateRatingStar } from "@/lib/generateRatingStar";
import { numberWithCommas } from "@/lib/utils";

export type VehicleCardType = {
  image: string;
  title: string;
  slug: string;
  no_of_review: number;
  rating: RatingStar;
  departure_at: string;
  price: number;
  vehicle_type: string;
};

type VehicleCardProps = {} & VehicleCardType;

const VehicleCard: React.FC<VehicleCardProps> = ({
  image,
  title,
  slug,
  rating,
  no_of_review,
  departure_at,
  price,
  vehicle_type,
}): React.JSX.Element => {
  useEffect(() => {});
  return (
    <Link href="" className={styles.container}>
      <div className={styles.card_image_container}>
        <Image
          src={image}
          alt={`${title.slice(0, 20)}...`}
          width={350}
          height={350}
          className={styles.card_image}
        />
      </div>
      <div className={styles.card_info}>
        <h6 className={styles.card_title}>{title}</h6>
        <div className={styles.card_rating_review}>
          <span className={styles.card_rating}>
            {generateRatingStar(rating).map((star, index) => {
              return (
                <Icon
                  icon={
                    star == "full"
                      ? "typcn:star-full-outline"
                      : star == "half"
                      ? "ic:round-star-half"
                      : "typcn:star-outline"
                  }
                  className={styles.card_rating__icon}
                  key={index}
                />
              );
            })}
          </span>
          <p>{numberWithCommas(no_of_review)}</p>
        </div>
        <div className={styles.card_departure_at}>
          <Icon
            icon="carbon:time-filled"
            className={styles.card_departure_at__icon}
          />
          <p data-card-p="key">Departure AT:</p>
          <p data-card-p="value">{departure_at}</p>
        </div>
        <div className={styles.card_price}>
          <Icon icon="raphael:dollar" className={styles.card_price__icon} />
          <p data-card-p="key">Price</p>
          <p data-card-p="value">NRS. {numberWithCommas(price)}/-</p>
        </div>
        <div className={styles.card_vehicle_type}>
          <Icon
            icon="fluent:vehicle-cab-16-filled"
            className={styles.card_vehicle_type__icon}
          />
          <p data-card-p="key">Vehicle Type:</p>
          <p data-card-p="value">{vehicle_type}</p>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;

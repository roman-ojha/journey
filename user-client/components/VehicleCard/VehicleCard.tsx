import styles from "@/styles/components/vehicleCard.module.scss";
import Link from "next/link";
import { useAppSelector } from "@/hooks/useAppStore";
import Image from "next/image";
import { numberWithCommas } from "@/lib/utils";
import AppIcon from "../appIcon/AppIcon";
import RatingStar from "../RatingStar";
import { Vehicle } from "@/interface/Vehicle";
import { useState } from "react";
import { Skeleton } from "@mui/material";
import getCssVariable from "@/lib/getCssVariable";
import { Avatar } from "@/components/ui/avatar";

export type VehicleCardType = Omit<Vehicle, "plate_number" | "seats">;

type VehicleCardProps = VehicleCardType & {
  isLoading: boolean;
  href: string;
};

const VehicleCard: React.FC<VehicleCardProps> = ({
  image,
  title,
  slug,
  no_of_review,
  rating,
  departure_at,
  price,
  vehicle_type,
  isLoading,
  href,
  departure_from,
  destination_place,
}): React.JSX.Element => {
  const vehicleCardLayout = useAppSelector((state) => state.vehicleCardLayout);

  return (
    <Link
      href={href}
      className={`${styles.container} ${
        vehicleCardLayout.layout == "list" ? styles.container_list_view : null
      }`}
    >
      <div
        className={
          styles.card_image_container + `${isLoading ? " px-5 pt-5" : ""}`
        }
      >
        {isLoading ? (
          <Skeleton
            sx={{ bgcolor: getCssVariable("--clr-skeleton-background", true) }}
            variant="rectangular"
            className={`${styles.card_image} ${
              vehicleCardLayout.layout == "list"
                ? styles.card_image_list_view
                : null
            }`}
          />
        ) : (
          <Image
            src={image}
            alt={`${title.slice(0, 20)}...`}
            width={350}
            height={350}
            className={`${styles.card_image} ${
              vehicleCardLayout.layout == "list"
                ? styles.card_image_list_view
                : null
            }`}
            priority={true}
          />
        )}
      </div>
      <div
        className={
          `${styles.card_info} ${
            vehicleCardLayout.layout == "list"
              ? styles.card_info_list_view
              : null
          }` + ` ${isLoading ? "w-full" : ""}`
        }
      >
        <h6 className={styles.card_title}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              sx={{
                bgcolor: getCssVariable("--clr-skeleton-background", true),
              }}
              className="rounded-sm"
            />
          ) : (
            `${title}`
          )}
        </h6>
        <div className={styles.card_rating_review}>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              sx={{
                bgcolor: getCssVariable("--clr-skeleton-background", true),
              }}
              className="w-2/4 rounded-sm"
            />
          ) : (
            <>
              <span className={styles.card_rating}>
                <RatingStar
                  rating={rating}
                  className={styles.card_rating__icon}
                />
              </span>
              <p>{numberWithCommas(no_of_review)}</p>
            </>
          )}
        </div>
        <div className={styles.card_departure_at}>
          {isLoading ? (
            <>
              <Skeleton
                variant="circular"
                className="w-6 h-6"
                sx={{
                  bgcolor: getCssVariable("--clr-skeleton-background", true),
                }}
              />
              <Skeleton
                variant="rectangular"
                sx={{
                  bgcolor: getCssVariable("--clr-skeleton-background", true),
                }}
                className="w-1/3 rounded-sm"
              />
            </>
          ) : (
            <>
              <AppIcon
                iconName="carbon:time-filled"
                use="iconify"
                className={styles.card_departure_at__icon}
              />
              <p data-card-p="key">Departure AT:</p>
              <p data-card-p="value">{departure_at}</p>
            </>
          )}
        </div>
        <div className={styles.card_price}>
          {isLoading ? (
            <>
              <Skeleton
                variant="circular"
                sx={{
                  bgcolor: getCssVariable("--clr-skeleton-background", true),
                }}
                className="w-6 h-6"
              />
              <Skeleton
                variant="rectangular"
                sx={{
                  bgcolor: getCssVariable("--clr-skeleton-background", true),
                }}
                className="w-1/4 rounded-sm"
              />
            </>
          ) : (
            <>
              <AppIcon
                iconName="raphael:dollar"
                use="iconify"
                className={styles.card_price__icon}
              />
              <p data-card-p="key">Price</p>
              <p data-card-p="value">NRS. {numberWithCommas(price)}/-</p>
            </>
          )}
        </div>
        <div className={styles.card_departure_from}>
          {isLoading ? (
            <>
              <Skeleton
                variant="circular"
                className="w-6 h-6"
                sx={{
                  bgcolor: getCssVariable("--clr-skeleton-background", true),
                }}
              />
              <Skeleton
                variant="rectangular"
                sx={{
                  bgcolor: getCssVariable("--clr-skeleton-background", true),
                }}
                className="w-1/2 rounded-sm"
              />
            </>
          ) : (
            <>
              <AppIcon
                iconName="fluent:location-12-filled"
                use="iconify"
                className={styles.card_vehicle_type__icon}
              />
              <p data-card-p="key">Departure From:</p>
              <p data-card-p="value">{departure_from}</p>
            </>
          )}
        </div>
        <div className={styles.card_destination_place}>
          {isLoading ? (
            <>
              <Skeleton
                variant="circular"
                className="w-6 h-6"
                sx={{
                  bgcolor: getCssVariable("--clr-skeleton-background", true),
                }}
              />
              <Skeleton
                variant="rectangular"
                sx={{
                  bgcolor: getCssVariable("--clr-skeleton-background", true),
                }}
                className="w-1/2 rounded-sm"
              />
            </>
          ) : (
            <>
              <AppIcon
                iconName="fluent:location-12-filled"
                use="iconify"
                className={styles.card_vehicle_type__icon}
              />
              <p data-card-p="key">Departure Place:</p>
              <p data-card-p="value">{destination_place}</p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;

import Image from "next/image";
import styles from "@/styles/components/vehicleCard.module.scss";
import { useAppSelector } from "@/hooks/useAppStore";
import RatingStar from "../RatingStar";
import { numberWithCommas } from "@/lib/utils";
import AppIcon from "../appIcon/AppIcon";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Skeleton } from "@mui/material";
import getCssVariable from "@/lib/getCssVariable";

const VehicleCardSkeleton = (): React.JSX.Element => {
  const vehicleCardLayout = useAppSelector((state) => state.vehicleCardLayout);
  return (
    <>
      <div
        className={`${styles.container} ${
          vehicleCardLayout.layout == "list" ? styles.container_list_view : null
        }`}
      >
        <div className={`${styles.card_image_container} px-5 pt-5`}>
          <Skeleton
            sx={{ bgcolor: getCssVariable("--clr-skeleton-background", true) }}
            variant="rectangular"
            className={`${styles.card_image} ${
              vehicleCardLayout.layout == "list"
                ? styles.card_image_list_view
                : null
            }`}
          />
        </div>
        <div
          className={`${styles.card_info} ${
            vehicleCardLayout.layout == "list"
              ? styles.card_info_list_view
              : null
          }`}
        >
          <h6 className={styles.card_title}>
            <Skeleton
              variant="rectangular"
              sx={{
                bgcolor: getCssVariable("--clr-skeleton-background", true),
              }}
              className="rounded-sm"
            />
          </h6>
          <div className={styles.card_rating_review}>
            <Skeleton
              variant="rectangular"
              sx={{
                bgcolor: getCssVariable("--clr-skeleton-background", true),
              }}
              className="w-2/4 rounded-sm"
            />
          </div>
          <div className={styles.card_departure_at}>
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
          </div>
          <div className={styles.card_price}>
            <Skeleton
              variant="circular"
              sx={{
                bgcolor: getCssVariable("--clr-skeleton-background", true),
              }}
              className="w-6 h-6 "
            />
            <Skeleton
              variant="rectangular"
              sx={{
                bgcolor: getCssVariable("--clr-skeleton-background", true),
              }}
              className="w-1/4 rounded-sm"
            />
          </div>
          <div className={styles.card_vehicle_type}>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleCardSkeleton;

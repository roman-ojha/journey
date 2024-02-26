import Image from "next/image";

import styles from "@/styles/page/vehicle/vehicleInfo.module.scss";
import AppIcon from "@/components/appIcon/AppIcon";
import { numberWithCommas } from "@/lib/utils";
import getFormattedDateFromUTC from "@/lib/getFormattedDateFromUTC";
import RatingStar from "@/components/RatingStar";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import getCssVariable from "@/lib/getCssVariable";
import { BookedVehicleDetails } from "@/hooks/reactQuery/useGetBookedVehicleDetails";

type VehicleInfoProps = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  vehicle?: BookedVehicleDetails;
};

const VehicleInfo: React.FC<VehicleInfoProps> = ({
  isLoading,
  vehicle,
  isError,
}): React.JSX.Element => {
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const tempTimeout = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(tempTimeout);
  //   };
  // });

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.vehicle_info_image_container}>
        {isLoading ? (
          <Skeleton
            sx={{ bgcolor: getCssVariable("--clr-skeleton-background", true) }}
            variant="rectangular"
            className={`${styles.vehicle_info_image} rounded-md`}
          />
        ) : (
          <Image
            src={vehicle?.images[0].image as string}
            alt={`${vehicle ? vehicle.name.slice(0, 20) : ""}...`}
            width={500}
            height={500}
            className={styles.vehicle_info_image}
            priority={true}
          />
        )}
      </div>
      <div className={styles.vehicle_info_info}>
        <h6 className={styles.vehicle_info_title}>
          {isLoading ? (
            <>
              <Skeleton
                variant="rectangular"
                sx={{
                  bgcolor: getCssVariable("--clr-skeleton-background", true),
                }}
                className="rounded-sm mb-2"
              />
              <Skeleton
                variant="rectangular"
                sx={{
                  bgcolor: getCssVariable("--clr-skeleton-background", true),
                }}
                className="rounded-sm w-1/4"
              />
            </>
          ) : (
            vehicle?.name
          )}
        </h6>
        <div className={styles.vehicle_info_rating_review}>
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
              <span className={styles.vehicle_info_rating}>
                <RatingStar
                  rating={vehicle?.rating as number}
                  className={styles.vehicle_info_rating__icon}
                />
              </span>
              <p>{vehicle ? numberWithCommas(vehicle?.no_of_reviews) : 0}</p>
            </>
          )}
        </div>
        <div className={styles.vehicle_info_departure_at}>
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
                className={styles.vehicle_info_departure_at__icon}
              />
              <p data-vehicle-info-p="key">Departure AT:</p>
              <p data-vehicle-info-p="value">
                {getFormattedDateFromUTC(
                  vehicle ? vehicle.travel.departure_at : new Date()
                )}
              </p>
            </>
          )}
        </div>
        <div className={styles.vehicle_info_departure_at}>
          {isLoading ? (
            <>
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
                className="w-2/4 rounded-sm"
              />
            </>
          ) : (
            <>
              <AppIcon
                iconName="fluent:location-12-filled"
                use="iconify"
                className={styles.vehicle_info_departure_at__icon}
              />
              <p data-vehicle-info-p="key">Departure From:</p>
              <p data-vehicle-info-p="value">
                {vehicle?.travel.from_place.name},{" "}
                {vehicle?.travel.from_place.district.name}
              </p>
            </>
          )}
        </div>
        <div className={styles.vehicle_info_departure_at}>
          {isLoading ? (
            <>
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
                className="w-2/4 rounded-sm"
              />
            </>
          ) : (
            <>
              <AppIcon
                iconName="fluent:location-12-filled"
                use="iconify"
                className={styles.vehicle_info_departure_at__icon}
              />
              <p data-vehicle-info-p="key">Destination Place:</p>
              <p data-vehicle-info-p="value">
                {vehicle?.travel.to_place.name},{" "}
                {vehicle?.travel.to_place.district.name}
              </p>
            </>
          )}
        </div>
        <div className={styles.vehicle_info_price}>
          {isLoading ? (
            <>
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
            </>
          ) : (
            <>
              <AppIcon
                iconName="raphael:dollar"
                use="iconify"
                className={styles.vehicle_info_price__icon}
              />
              <p data-vehicle-info-p="key">Price</p>
              <p data-vehicle-info-p="value">
                NRS.{" "}
                {numberWithCommas(
                  vehicle ? vehicle.travel.seat_average_price : 0
                )}
                /-
              </p>
            </>
          )}
        </div>
        <div className={styles.vehicle_info_vehicle_type}>
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
                iconName="fluent:vehicle-cab-16-filled"
                use="iconify"
                className={styles.vehicle_info_vehicle_type__icon}
              />
              <p data-vehicle-info-p="key">Vehicle Type:</p>
              <p data-vehicle-info-p="value">{vehicle?.model.name}</p>
            </>
          )}
        </div>
        <div className={styles.vehicle_info_departure_at}>
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
                iconName="solar:plate-linear"
                use="iconify"
                className={styles.vehicle_info_departure_at__icon}
              />
              <p data-vehicle-info-p="key">Plate Number:</p>
              <p data-vehicle-info-p="value">{vehicle?.plate_no}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleInfo;

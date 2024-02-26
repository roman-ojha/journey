"use client";
import getCssVariable from "@/lib/getCssVariable";
import { Skeleton } from "@mui/material";
import { VehicleSeatsInfoProps } from "../pages/vehicle/VehicleSeatsInfo/VehicleSeatsInfo";
import AppIcon from "@/components/appIcon/AppIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import styles from "@/styles/page/vehicle/vehicleSeats.module.scss";
import {
  handleSelect,
  setVehicleDetailSeats,
} from "@/services/store/features/vehicleSeat/vehicleSeatSlice";
import { useEffect } from "react";

const VehicleSeats: React.FC<VehicleSeatsInfoProps> = ({
  vehicleType,
  isLoading,
  isError,
  isSuccess,
  seats,
}): React.JSX.Element => {
  const vehicleSeats = useAppSelector((state) => state.vehicleSeats);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && seats && vehicleType) {
      dispatch(setVehicleDetailSeats({ seats, vehicleType }));
    }
  }, [dispatch, isSuccess, seats, vehicleType]);

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {isLoading ? (
        <div className="w-1/2 h-96">
          <Skeleton
            sx={{ bgcolor: getCssVariable("--clr-skeleton-background", true) }}
            variant="rectangular"
            className="!h-full rounded-md"
          />
        </div>
      ) : vehicleType && seats ? (
        <section className={styles.vehicle_seats_section}>
          <div
            className={`${styles.vehicle_seats} ${
              vehicleType == "SUPER_DELUX_BUS"
                ? styles.super_deluxe_vehicle_seats
                : vehicleType == "HIASE"
                ? styles.hiaCe_vehicle_seats
                : ""
            }`}
          >
            {vehicleSeats.map((row, rowIndex) =>
              row.map((seat, columnIndex) => (
                <span
                  className={styles.vehicle_seat}
                  key={`${rowIndex}-${columnIndex}`}
                >
                  {!seat.isSeat ? null : seat.type == "driver" ? (
                    <AppIcon
                      iconName="ph:steering-wheel-fill"
                      use="iconify"
                      className={styles.vehicle_seat__driver_icon}
                    />
                  ) : (
                    seat.type == "user" && (
                      <>
                        <AppIcon
                          iconName="mdi:seat"
                          use="iconify"
                          className={styles.vehicle_seat__icon}
                          onClick={() =>
                            dispatch(
                              handleSelect({
                                rowIndex,
                                columnIndex,
                              })
                            )
                          }
                          style={
                            seat.isBooked
                              ? { color: getCssVariable("--clr-base-tertiary") }
                              : seat.isSelected
                              ? {
                                  color: getCssVariable("--clr-base-secondary"),
                                }
                              : {}
                          }
                        />
                        <b>{seat.seatNumber}</b>
                        <p>Rs. {seat.seatPrice}</p>
                      </>
                    )
                  )}
                </span>
              ))
            )}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default VehicleSeats;

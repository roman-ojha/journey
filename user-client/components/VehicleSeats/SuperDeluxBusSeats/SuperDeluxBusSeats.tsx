"use client";
import AppIcon from "@/components/appIcon/AppIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import getCssVariable from "@/lib/getCssVariable";
import styles from "@/styles/page/vehicle/deluxeBusSeats.module.scss";
import { handleSelect } from "@/services/store/features/vehicleSeat/vehicleSeatSlice";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

const SuperDeluxeBusSeats = (): React.JSX.Element => {
  const vehicleSeats = useAppSelector((state) => state.vehicleSeats);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSelectSeat = (rowIndex: number, columnIndex: number) => {
    // setVehicleStructure(
    //   vehicleStructure.map((_, rowI) => {
    //     if (rowI == rowIndex) {
    //       return _.map((seat, columnI) => {
    //         if (columnI == columnIndex)
    //           if (!seat.isBooked && seat.isSeat && seat.type == "user") {
    //             if (!seat.isSelected)
    //               return getSelectedUserSeat(seat.seatNumber, seat.seatPrice);
    //             if (seat.isSelected)
    //               return getNormalUserSeat(seat.seatNumber, seat.seatPrice);
    //           }
    //         return seat;
    //       });
    //     }
    //     return _;
    //   })
    // );
  };

  useEffect(() => {
    const tempTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(tempTimeout);
    };
  }, []);

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
      ) : (
        <section className={styles.vehicle_seats_section}>
          <div className={styles.vehicle_seats}>
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
      )}
    </>
  );
};

export default SuperDeluxeBusSeats;

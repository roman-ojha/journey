"use client";
import AppIcon from "@/components/appIcon/AppIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import getCssVariable from "@/lib/getCssVariable";
import styles from "@/styles/page/vehicle/vehicleSeats.module.scss";
import {
  handleSelect,
  setVehicleDetailSeats,
} from "@/services/store/features/vehicleSeat/vehicleSeatSlice";
import { VehicleDetail } from "@/hooks/reactQuery/useVehicleDetail";
import { useEffect } from "react";
import { VehicleModel } from "@/schema/VehicleModel";

export type SeatsProps = {
  isSuccess: boolean;
  vehicleType: VehicleModel["name"];
  seats: VehicleDetail["seats"];
};

const SuperDeluxeBusSeats: React.FC<SeatsProps> = ({
  seats,
  isSuccess,
  vehicleType,
}): React.JSX.Element => {
  const vehicleSeats = useAppSelector((state) => state.vehicleSeats);
  const dispatch = useAppDispatch();

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
    if (isSuccess) {
      dispatch(setVehicleDetailSeats({ seats, vehicleType }));
    }
  }, [dispatch, isSuccess, seats, vehicleType]);

  return (
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
  );
};

export default SuperDeluxeBusSeats;

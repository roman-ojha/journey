"use client";
import AppIcon from "@/components/appIcon/AppIcon";
import getCssVariable from "@/lib/getCssVariable";
import styles from "@/styles/page/vehicle/deluxeBusSeats.module.scss";
import { useState } from "react";
import {
  BookedUserSeat,
  DriverSeat,
  EmptySeat,
  NormalUserSeat,
  SelectedUserSeat,
  VehicleSeat,
} from "../SeatTypes";

const DeluxeBusSeats = (): React.JSX.Element => {
  const getEmptySeat = (): EmptySeat => ({
    isSeat: false,
  });

  const getDriverSeat = (): DriverSeat => ({
    isSeat: true,
    type: "driver",
  });

  const getBookedUserSeat = (
    seatNumber: string,
    seatPrice: number
  ): BookedUserSeat => ({
    isSeat: true,
    type: "user",
    isBooked: true,
    seatNumber,
    seatPrice,
  });

  const getSelectedUserSeat = (
    seatNumber: string,
    seatPrice: number
  ): SelectedUserSeat => ({
    isSeat: true,
    type: "user",
    isSelected: true,
    seatNumber,
    seatPrice,
  });

  const getNormalUserSeat = (
    seatNumber: string,
    seatPrice: number
  ): NormalUserSeat => ({
    isSeat: true,
    type: "user",
    isBooked: false,
    seatNumber,
    seatPrice,
  });

  const [vehicleStructure, setVehicleStructure] = useState<VehicleSeat[][]>([
    [
      getEmptySeat(),
      getEmptySeat(),
      getEmptySeat(),
      getEmptySeat(),
      getDriverSeat(),
    ],
    [
      getEmptySeat(),
      getEmptySeat(),
      getEmptySeat(),
      getNormalUserSeat("KA", 1350),
      getBookedUserSeat("KH", 1350),
    ],
    [
      getBookedUserSeat("KH", 1350),
      getNormalUserSeat("KA", 1350),
      getEmptySeat(),
      getBookedUserSeat("KH", 1350),
      getNormalUserSeat("KA", 1350),
    ],
    [
      getBookedUserSeat("KH", 1350),
      getNormalUserSeat("KA", 1350),
      getEmptySeat(),
      getBookedUserSeat("KH", 1350),
      getBookedUserSeat("KH", 1350),
    ],
    [
      getBookedUserSeat("KH", 1350),
      getNormalUserSeat("KA", 1350),
      getEmptySeat(),
      getNormalUserSeat("KA", 1350),
      getNormalUserSeat("KA", 1350),
    ],
    [
      getNormalUserSeat("KA", 1350),
      getNormalUserSeat("KA", 1350),
      getEmptySeat(),
      getBookedUserSeat("KH", 1350),
      getNormalUserSeat("KA", 1350),
    ],
    [
      getNormalUserSeat("KA", 1350),
      getNormalUserSeat("KA", 1350),
      getEmptySeat(),
      getBookedUserSeat("KH", 1350),
      getNormalUserSeat("KA", 1350),
    ],
    [
      getNormalUserSeat("KA", 1350),
      getBookedUserSeat("KH", 1350),
      getEmptySeat(),
      getNormalUserSeat("KA", 1350),
      getBookedUserSeat("KH", 1350),
    ],
    [
      getSelectedUserSeat("A9", 1350),
      getSelectedUserSeat("A9", 1350),
      getEmptySeat(),
      getBookedUserSeat("KH", 1350),
      getBookedUserSeat("KH", 1350),
    ],
    [
      getSelectedUserSeat("A9", 1350),
      getSelectedUserSeat("A9", 1350),
      getEmptySeat(),
      getNormalUserSeat("KA", 1350),
      getNormalUserSeat("KA", 1350),
    ],
    [
      getNormalUserSeat("KA", 1350),
      getNormalUserSeat("KA", 1350),
      getNormalUserSeat("KA", 1350),
      getNormalUserSeat("KA", 1350),
      getNormalUserSeat("KA", 1350),
    ],
  ]);

  const handleSelectSeat = (rowIndex: number, columnIndex: number) => {
    setVehicleStructure(
      vehicleStructure.map((_, rowI) => {
        if (rowI == rowIndex) {
          return _.map((seat, columnI) => {
            if (columnI == columnIndex)
              if (!seat.isBooked && seat.isSeat && seat.type == "user") {
                if (!seat.isSelected)
                  return getSelectedUserSeat(seat.seatNumber, seat.seatPrice);
                if (seat.isSelected)
                  return getNormalUserSeat(seat.seatNumber, seat.seatPrice);
              }
            return seat;
          });
        }
        return _;
      })
    );
  };

  return (
    <section className={styles.vehicle_seats_section}>
      <div className={styles.vehicle_seats}>
        {vehicleStructure.map((row, rowIndex) =>
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
                      onClick={() => handleSelectSeat(rowIndex, columnIndex)}
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

export default DeluxeBusSeats;

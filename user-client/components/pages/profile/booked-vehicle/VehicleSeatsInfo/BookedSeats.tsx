"use client";
import AppIcon from "@/components/appIcon/AppIcon";
import getCssVariable from "@/lib/getCssVariable";
import styles from "@/styles/page/vehicle/selectedSeats.module.scss";
import { BuySeatsDrawer } from "../BuySeatsDrawer/BuySeatsDrawer";
import { useAppSelector } from "@/hooks/useAppStore";
import {
  getSelectedSeats,
  getTotalSeatPrice,
} from "@/services/store/features/vehicleSeat/vehicleSeatSlice";
import { useEffect, useState } from "react";
import Button from "@/components/buttons/Button";

const BookedSeats = (): React.JSX.Element => {
  // const selectedSeats = getSelectedSeats({
  //   vehicleSeats: useAppSelector((state) => state.vehicleSeats),
  // });

  return (
    <section className={`${styles.selected_seats_section} mb-4`}>
      <h5>Booked Seats</h5>
      <div className={styles.selected_seats}>
        {/* {selectedSeats.map((seat, index) => (
          <span className={styles.vehicle_seat} key={index}>
            <AppIcon
              iconName="mdi:seat"
              use="iconify"
              className={styles.vehicle_seat__icon}
              style={{
                color: getCssVariable("--clr-base-secondary"),
              }}
            />
            <b>{seat.seatNumber}</b>
            <p>Rs. {seat.seatPrice}</p>
          </span>
        ))} */}
      </div>
      <div className="flex gap-2">
        <b>Payment status:</b>
        <p>Pending</p>
      </div>
      <div className={styles.selected_seats_total_price}>
        <b>Total Price: </b>
        <p>Rs. 3000/-</p>
      </div>
      <p>
        NOTE that if you will not pay booked seats for 15 min and then if other
        have booked the same seats then your booking won&apos;t consider valid
        and you booking will get removed.
      </p>
      <Button backgroundColor="primary" width="100%">
        Pay Now
      </Button>
    </section>
  );
};

export default BookedSeats;
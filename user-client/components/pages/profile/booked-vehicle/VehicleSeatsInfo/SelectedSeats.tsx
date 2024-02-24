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
import { Skeleton } from "@mui/material";
import Button from "@/components/buttons/Button";

const SelectedSeats: React.FC<{
  vehicle_id?: string;
}> = ({ vehicle_id }): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const selectedSeats = getSelectedSeats({
    vehicleSeats: useAppSelector((state) => state.vehicleSeats),
  });

  useEffect(() => {
    const tempTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(tempTimeout);
    };
  }, []);

  return (
    <section className={styles.selected_seats_section}>
      <h5>Selected Seats</h5>
      <div className={styles.selected_seats}>
        {selectedSeats.map((seat, index) => (
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
        ))}
      </div>
      <div className={styles.selected_seats_total_price}>
        <b>Total Price: </b>
        <p>Rs. {getTotalSeatPrice(selectedSeats)}/-</p>
      </div>
      <BuySeatsDrawer disabled={isLoading} vehicle_id={vehicle_id} />
    </section>
  );
};

export default SelectedSeats;

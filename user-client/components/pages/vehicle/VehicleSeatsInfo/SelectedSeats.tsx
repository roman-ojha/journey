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

const SelectedSeats = (): React.JSX.Element => {
  const selectedSeats = getSelectedSeats({
    vehicleSeats: useAppSelector((state) => state.vehicleSeats),
  });

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
      <BuySeatsDrawer />
    </section>
  );
};

export default SelectedSeats;

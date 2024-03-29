"use client";
import AppIcon from "@/components/appIcon/AppIcon";
import getCssVariable from "@/lib/getCssVariable";
import styles from "@/styles/page/vehicle/selectedSeats.module.scss";
import { BuySeatsDrawer } from "@/components/VehicleSeats/BuySeatsDrawer/BuySeatsDrawer";
import { useAppSelector } from "@/hooks/useAppStore";
import {
  getBookedSeats,
  getTotalSeatPrice,
} from "@/services/store/features/vehicleSeat/vehicleSeatSlice";
import Button from "@/components/buttons/Button";

const BookedSeats = (): React.JSX.Element => {
  const bookedSeats = getBookedSeats({
    vehicleSeats: useAppSelector((state) => state.vehicleSeats),
  });

  const authUserBookedSeats = bookedSeats.filter(
    (seat) => seat.isBooked && seat.isBookedByAuthUser
  );

  return (
    <section className={`${styles.selected_seats_section} mb-4`}>
      <h5>Booked Seats</h5>
      <div className={styles.selected_seats}>
        {authUserBookedSeats.map((seat, index) => {
          if (seat) {
            return (
              <span className={styles.vehicle_seat} key={index}>
                <AppIcon
                  iconName="mdi:seat"
                  use="iconify"
                  className={styles.vehicle_seat__icon}
                  style={{
                    color: getCssVariable("--clr-base-primary"),
                  }}
                />
                <b>{seat.seatNumber}</b>
                <p>Rs. {seat.seatPrice}</p>
              </span>
            );
          }
        })}
      </div>
      <div className={styles.selected_seats_total_price}>
        <b>Total Price: </b>
        <p>Rs. {getTotalSeatPrice(authUserBookedSeats)}</p>
      </div>
      {/* <p>
        NOTE that if you will not pay booked seats for 15 min and then if other
        have booked the same seats then your booking won&apos;t consider valid
        and you booking will get removed.
      </p> */}
      {/* <Button backgroundColor="primary" width="100%">
        Pay Now
      </Button> */}
    </section>
  );
};

export default BookedSeats;

import AppIcon from "@/components/appIcon/AppIcon";
import Button from "@/components/buttons/Button";
import getCssVariable from "@/lib/getCssVariable";
import styles from "@/styles/page/vehicle/selectedSeats.module.scss";
import { BuySeatsDrawer } from "../BuySeatsDrawer/BuySeatsDrawer";

const SelectedSeats = (): React.JSX.Element => {
  return (
    <section className={styles.selected_seats_section}>
      <h5>Selected Seats</h5>
      <div className={styles.selected_seats}>
        {Array.from({ length: 7 }).map((_, index) => (
          <span className={styles.vehicle_seat} key={index}>
            <AppIcon
              iconName="mdi:seat"
              use="iconify"
              className={styles.vehicle_seat__icon}
              style={{
                color: getCssVariable("--clr-base-secondary"),
              }}
            />
            <b>A9</b>
            <p>Rs. 1350</p>
          </span>
        ))}
      </div>
      <div className={styles.selected_seats_total_price}>
        <b>Total Price: </b>
        <p>Rs. 1350/-</p>
      </div>
      <BuySeatsDrawer />
    </section>
  );
};

export default SelectedSeats;

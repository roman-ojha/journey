import AppIcon from "@/components/appIcon/AppIcon";
import getCssVariable from "@/lib/getCssVariable";
import styles from "@/styles/page/vehicle/deluxeBusSeats.module.scss";

const DeluxeBusSeats = (): React.JSX.Element => {
  return (
    <section className={styles.vehicle_seats_section}>
      <div className={styles.vehicle_seats_status}>
        <span
          className={styles.vehicle_seats_status__color}
          style={{ backgroundColor: getCssVariable("--clr-base-white") }}
        ></span>
        <p>Not Booked</p>
        <span
          className={styles.vehicle_seats_status__color}
          style={{ backgroundColor: getCssVariable("--clr-base-tertiary") }}
        ></span>
        <p>Booked</p>
        <span
          className={styles.vehicle_seats_status__color}
          style={{ backgroundColor: getCssVariable("--clr-base-secondary") }}
        ></span>
        <p>Selected</p>
      </div>
      <div className={styles.vehicle_seats}>
        {Array.from({ length: 40 }).map((_, index) => (
          <span className={styles.vehicle_seat} key={index}>
            <AppIcon
              iconName="mdi:seat"
              use="iconify"
              className={styles.vehicle_seat__icon}
            />
            <b>KA</b>
            <p>Rs. 1350</p>
          </span>
        ))}
      </div>
    </section>
  );
};

export default DeluxeBusSeats;

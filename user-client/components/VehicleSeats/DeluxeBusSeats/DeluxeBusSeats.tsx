import getCssVariable from "@/lib/getCssVariable";
import styles from "@/styles/page/vehicle/deluxeBusSeats.module.scss";

const DeluxeBusSeats = (): React.JSX.Element => {
  return (
    <section className={styles.bus_seats_section}>
      <div className={styles.bus_seats_status}>
        <span
          className={styles.bus_seats_status__color}
          style={{ backgroundColor: getCssVariable("--clr-base-white") }}
        ></span>
        <p>Not Booked</p>
        <span
          className={styles.bus_seats_status__color}
          style={{ backgroundColor: getCssVariable("--clr-base-tertiary") }}
        ></span>
        <p>Booked</p>
        <span
          className={styles.bus_seats_status__color}
          style={{ backgroundColor: getCssVariable("--clr-base-secondary") }}
        ></span>
        <p>Selected</p>
      </div>
      <div className={styles.bus_seats}></div>
    </section>
  );
};

export default DeluxeBusSeats;

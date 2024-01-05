import DeluxeBusSeats from "@/components/VehicleSeats/DeluxeBusSeats/DeluxeBusSeats";
import styles from "@/styles/page/vehicle/index.module.scss";

const VehicleSeatsInfo = (): React.JSX.Element => {
  return (
    <section className={styles.vehicle_seats_info_section}>
      <DeluxeBusSeats />
    </section>
  );
};

export default VehicleSeatsInfo;

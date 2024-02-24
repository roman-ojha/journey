import styles from "@/styles/page/vehicle/index.module.scss";
import SelectedSeats from "./SelectedSeats";
import getCssVariable from "@/lib/getCssVariable";
import VehicleSeats from "@/components/VehicleSeats/VehicleSeats";
import { VehicleModel } from "@/schema/VehicleModel";
import { VehicleDetail } from "@/hooks/reactQuery/useVehicleDetail";

export type VehicleSeatsInfoProps = {
  vehicleType?: VehicleModel["name"];
  seats?: VehicleDetail["seats"];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  vehicle_id?: string;
};

const VehicleSeatsInfo: React.FC<VehicleSeatsInfoProps> = ({
  ...props
}): React.JSX.Element => {
  return (
    <section className={styles.vehicle_seats_info_section}>
      <div className={styles.vehicle_seats_status}>
        <span
          className={styles.vehicle_seats_status__color}
          style={{
            backgroundColor: getCssVariable("--clr-foreground-primary", true),
          }}
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
      <div className={styles.vehicle_seats_main}>
        <VehicleSeats {...props} />
        <SelectedSeats vehicle_id={props.vehicle_id} />
      </div>
    </section>
  );
};

export default VehicleSeatsInfo;

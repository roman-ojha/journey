import Image from "next/image";

import styles from "@/styles/page/vehicle/vehicleInfo.module.scss";
import AppIcon from "@/components/appIcon/AppIcon";
import { numberWithCommas } from "@/lib/utils";
import getFormattedDateFromUTC from "@/lib/getFormattedDateFromUTC";
import RatingStar from "@/components/RatingStar";

const VehicleInfoSkeleton = (): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.vehicle_info_image_container}>
        <Image
          src="https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={`${"Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)".slice(
            0,
            20
          )}...`}
          width={500}
          height={500}
          className={styles.vehicle_info_image}
          priority={true}
        />
      </div>
      <div className={styles.vehicle_info_info}>
        <h6 className={styles.vehicle_info_title}>
          Matri Vhagya Rekha, AC (Swayambu Yatayat Pvt.Ltd)
        </h6>
        <div className={styles.vehicle_info_rating_review}>
          <span className={styles.vehicle_info_rating}>
            <RatingStar
              rating={4.3}
              className={styles.vehicle_info_rating__icon}
            />
          </span>
          <p>{numberWithCommas(21346)}</p>
        </div>
        <div className={styles.vehicle_info_departure_at}>
          <AppIcon
            iconName="carbon:time-filled"
            use="iconify"
            className={styles.vehicle_info_departure_at__icon}
          />
          <p data-vehicle-info-p="key">Departure AT:</p>
          <p data-vehicle-info-p="value">
            {getFormattedDateFromUTC(new Date())}
          </p>
        </div>
        <div className={styles.vehicle_info_departure_at}>
          <AppIcon
            iconName="fluent:location-12-filled"
            use="iconify"
            className={styles.vehicle_info_departure_at__icon}
          />
          <p data-vehicle-info-p="key">Departure From:</p>
          <p data-vehicle-info-p="value">Koteshwar, Kathmandu</p>
        </div>
        <div className={styles.vehicle_info_departure_at}>
          <AppIcon
            iconName="fluent:location-12-filled"
            use="iconify"
            className={styles.vehicle_info_departure_at__icon}
          />
          <p data-vehicle-info-p="key">Destination Place:</p>
          <p data-vehicle-info-p="value">Kerkha, Jhapa</p>
        </div>
        <div className={styles.vehicle_info_price}>
          <AppIcon
            iconName="raphael:dollar"
            use="iconify"
            className={styles.vehicle_info_price__icon}
          />
          <p data-vehicle-info-p="key">Price</p>
          <p data-vehicle-info-p="value">NRS. {numberWithCommas(2011)}/-</p>
        </div>
        <div className={styles.vehicle_info_vehicle_type}>
          <AppIcon
            iconName="fluent:vehicle-cab-16-filled"
            use="iconify"
            className={styles.vehicle_info_vehicle_type__icon}
          />
          <p data-vehicle-info-p="key">Vehicle Type:</p>
          <p data-vehicle-info-p="value">Deluxe Bus</p>
        </div>
        <div className={styles.vehicle_info_departure_at}>
          <AppIcon
            iconName="solar:plate-linear"
            use="iconify"
            className={styles.vehicle_info_departure_at__icon}
          />
          <p data-vehicle-info-p="key">Plate Number:</p>
          <p data-vehicle-info-p="value">BA 1 Kha, 3233</p>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoSkeleton;

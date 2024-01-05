import Image from "next/image";

import styles from "@/styles/page/vehicle/vehicleInfo.module.scss";
import { generateRatingStar } from "@/lib/generateRatingStar";
import AppIcon from "@/components/appIcon/AppIcon";
import { numberWithCommas } from "@/lib/utils";
import getFormattedDateFromUTC from "@/lib/getFormattedDateFromUTC";

const VehicleInfo = (): React.JSX.Element => {
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
            {generateRatingStar("4.5").map((star, index) => {
              return (
                <AppIcon
                  iconName={
                    star == "full"
                      ? "typcn:star-full-outline"
                      : star == "half"
                      ? "ic:round-star-half"
                      : "typcn:star-outline"
                  }
                  use="iconify"
                  className={styles.vehicle_info_rating__icon}
                  key={index}
                />
              );
            })}
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
      </div>
    </div>
  );
};

export default VehicleInfo;

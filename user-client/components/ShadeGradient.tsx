import { NO_NAVBAR_FOR_ROUTES } from "@/data/constants";
import styles from "@/styles/components/shadeGradient.module.scss";
import { usePathname } from "next/navigation";

const ShadeGradient = (): React.JSX.Element => {
  const path = usePathname();
  if (NO_NAVBAR_FOR_ROUTES.includes(path)) {
    return <></>;
  }
  return (
    <div>
      {path == "/" && <div className={styles.vehicle_image}></div>}
      <div className={styles.background_1st}>
        <div className={styles.background_2nd}></div>
      </div>
    </div>
  );
};

export default ShadeGradient;

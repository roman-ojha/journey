import styles from "@/styles/components/shadeGradient.module.scss";
import { usePathname } from "next/navigation";

const ShadeGradient = (): React.JSX.Element => {
  const path = usePathname();
  return (
    <>
      {path == "/" && <div className={styles.vehicle_image}></div>}
      <div className={styles.background_1st}>
        <div className={styles.background_2nd}></div>
      </div>
    </>
  );
};

export default ShadeGradient;

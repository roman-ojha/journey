import HorizontalSearchBox from "@/components/HorizontalSearchBox/HorizontalSearchBox";
import VehicleInfo from "@/components/pages/vehicle/VehicleInfo/VehicleInfo";
import VehicleReviewAndRating from "@/components/pages/vehicle/VehicleReviewAndRating/VehicleReviewAndRating";
import VehicleSeatsInfo from "@/components/pages/vehicle/VehicleSeatsInfo/VehicleSeatsInfo";
import styles from "@/styles/page/vehicle/index.module.scss";

type VehicleDetailProps = {
  params: {
    vehicle_slug: string;
  };
};

const VehicleDetail: React.FC<VehicleDetailProps> = ({
  params,
}): React.JSX.Element => {
  return (
    <main className={styles.vehicle_page}>
      <HorizontalSearchBox />
      <VehicleInfo />
      <VehicleSeatsInfo />
      <VehicleReviewAndRating />
    </main>
  );
};

export default VehicleDetail;

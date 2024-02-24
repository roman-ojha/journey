"use client";
import HorizontalSearchBox from "@/components/HorizontalSearchBox/HorizontalSearchBox";
import VehicleInfo from "@/components/pages/profile/booked-vehicle/VehicleInfo/VehicleInfo";
import VehicleReviewAndRating from "@/components/pages/profile/booked-vehicle/VehicleReviewAndRating/VehicleReviewAndRating";
import VehicleSeatsInfo from "@/components/pages/profile/booked-vehicle/VehicleSeatsInfo/VehicleSeatsInfo";
import useVehicleDetail, {
  VehicleDetail as VehicleDetailType,
} from "@/hooks/reactQuery/useVehicleDetail";
import styles from "@/styles/page/vehicle/index.module.scss";

type VehicleDetailProps = {
  params: {
    vehicle_slug: string;
  };
};

const VehicleDetail: React.FC<VehicleDetailProps> = ({
  params,
}): React.JSX.Element => {
  const { data, isError, isSuccess, isLoading } = useVehicleDetail(
    params.vehicle_slug
  );

  return (
    <main className={styles.vehicle_page}>
      {/* <HorizontalSearchBox /> */}
      <VehicleInfo
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        vehicle={data?.data as VehicleDetailType}
      />
      <VehicleSeatsInfo
        vehicleType={data?.data.model?.name}
        isError={isError}
        isSuccess={isSuccess}
        isLoading={isLoading}
        seats={data?.data.seats}
        vehicle_id={data?.data._id}
      />
      <VehicleReviewAndRating />
    </main>
  );
};

export default VehicleDetail;

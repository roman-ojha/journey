"use client";
import HorizontalSearchBox from "@/components/HorizontalSearchBox/HorizontalSearchBox";
import VehicleInfo from "@/components/pages/profile/booked-vehicle/VehicleInfo/VehicleInfo";
import VehicleReviewAndRating from "@/components/pages/profile/booked-vehicle/VehicleReviewAndRating/VehicleReviewAndRating";
import VehicleSeatsInfo from "@/components/pages/profile/booked-vehicle/VehicleSeatsInfo/VehicleSeatsInfo";
import useGetBookedVehicleDetails, {
  BookedVehicleDetails,
} from "@/hooks/reactQuery/useGetBookedVehicleDetails";
import styles from "@/styles/page/vehicle/index.module.scss";

type VehicleDetailProps = {
  params: {
    vehicle_slug: string;
  };
};

const VehicleDetail: React.FC<VehicleDetailProps> = ({
  params,
}): React.JSX.Element => {
  const { data, isError, isSuccess, isLoading } = useGetBookedVehicleDetails(
    params.vehicle_slug
  );

  if (isSuccess) {
    return (
      <main className={styles.vehicle_page}>
        {/* <HorizontalSearchBox /> */}
        <VehicleInfo
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          vehicle={data?.data.data as BookedVehicleDetails}
        />
        <VehicleSeatsInfo
          vehicleType={data?.data.data?.model?.name}
          isError={isError}
          isSuccess={isSuccess}
          isLoading={isLoading}
          seats={data?.data.data?.seats}
          vehicle_id={data?.data.data?._id}
        />
        <VehicleReviewAndRating />
      </main>
    );
  }
  return <></>;
};

export default VehicleDetail;

"use client";
import HorizontalSearchBox from "@/components/HorizontalSearchBox/HorizontalSearchBox";
import VehicleInfo from "@/app/vehicle/[vehicle_slug]/_components/VehicleInfo/VehicleInfo";
import VehicleReviewAndRating from "@/components/ReviewAndRating/VehicleReviewAndRating";
import VehicleSeatsInfo from "./_components/VehicleSeatsInfo/VehicleSeatsInfo";
import useGetBookedVehicleDetails, {
  BookedVehicleDetails,
} from "@/hooks/reactQuery/useGetBookedVehicleDetails";
import styles from "@/styles/page/vehicle/index.module.scss";
import BookedSeatsTicket from "./_components/BookedSeatsTicket/BookedSeatsTicket";

type VehicleDetailProps = {
  params: {
    vehicle_slug: string;
  };
};

const VehicleDetail: React.FC<VehicleDetailProps> = ({
  params,
}): React.JSX.Element => {
  const { data, isError, isSuccess, isLoading } = useGetBookedVehicleDetails(
    params.vehicle_slug,
  );

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
      <BookedSeatsTicket
        ticket={data?.data.data?.ticket}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
      />
    </main>
  );
};

export default VehicleDetail;

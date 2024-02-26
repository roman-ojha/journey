"use client";
import VehicleCard from "@/components/VehicleCard/VehicleCard";
import useGetBookedVehicles from "@/hooks/reactQuery/useGetBookedVehicles";
import { useAppSelector } from "@/hooks/useAppStore";
import getFormattedDateFromUTC from "@/lib/getFormattedDateFromUTC";
import styles from "@/styles/page/profile/index.module.scss";

const ProfileVehicleCards = (): React.JSX.Element => {
  const vehicleCardLayout = useAppSelector((state) => state.vehicleCardLayout);
  const { data, isLoading, isError, isSuccess } = useGetBookedVehicles();

  return (
    <section
      className={`${styles.card_container} ${
        vehicleCardLayout.layout == "grid"
          ? styles.card_container_grid_view
          : styles.card_container_list_view
      }`}
    >
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <VehicleCard
              image={""}
              title={""}
              rating={0}
              no_of_review={0}
              departure_at={""}
              price={0}
              vehicle_type={""}
              slug={""}
              key={index}
              isLoading={isLoading}
              href="/"
            />
          ))
        : isSuccess && data
        ? data.data.data.map((vehicle, index) => (
            <VehicleCard
              image={vehicle.image.image}
              title={vehicle.name}
              rating={vehicle.average_rating}
              no_of_review={vehicle.no_of_reviews}
              departure_at={getFormattedDateFromUTC(
                vehicle.travel.departure_at
              )}
              price={vehicle.travel.seat_average_price}
              vehicle_type={vehicle.model.name}
              slug={vehicle.slug}
              key={index}
              isLoading={isLoading}
              href={`/profile/booked-vehicle/${vehicle.slug}`}
            />
          ))
        : null}
    </section>
  );
};

export default ProfileVehicleCards;

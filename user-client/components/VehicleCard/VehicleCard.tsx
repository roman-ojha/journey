"use client";
import styles from "@/styles/components/vehicleCard.module.scss";
import Link from "next/link";
import { RatingStar, generateRatingStar } from "@/lib/generateRatingStar";
import VehicleCardChildren from "./VehicleCardChildren";
import { useAppSelector } from "@/hooks/useAppStore";

export type VehicleCardType = {
  image: string;
  title: string;
  slug: string;
  no_of_review: number;
  rating: RatingStar;
  departure_at: string;
  price: number;
  vehicle_type: string;
};

type VehicleCardProps = {} & VehicleCardType;

const VehicleCard: React.FC<VehicleCardProps> = (props): React.JSX.Element => {
  const vehicleCardLayout = useAppSelector((state) => state.vehicleCardLayout);
  console.log(vehicleCardLayout);
  return (
    <Link
      href=""
      className={`${styles.container} ${
        vehicleCardLayout.layout == "list" ? styles.container_list_view : null
      }`}
    >
      <VehicleCardChildren {...props} />
    </Link>
  );
};

export default VehicleCard;

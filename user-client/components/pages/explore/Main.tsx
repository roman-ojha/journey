"use client";
import styles from "@/styles/page/explore/index.module.scss";
import HorizontalSearchBox from "@/components/HorizontalSearchBox/HorizontalSearchBox";
import CardHeader from "@/components/pages/explore/CardHeader/CardHeader";
import CardFilter from "@/components/pages/explore/CardFilter/CardFilter";
import VehicleCards from "@/components/pages/explore/VehicleCards";
import useExploreAndSearchedVehicles from "@/hooks/reactQuery/useExploreAndSearchedVehicles";
import { useSearchParams } from "next/navigation";

export type SearchParameterObj = {
  from: { district: string; place: string };
  to: { district: string; place: string };
  departure_at: string;
};

const MainExplore = (): React.JSX.Element => {
  const searchParams = useSearchParams();
  let searchParameter: SearchParameterObj | null = null;
  if (
    searchParams.get("from-district") ||
    searchParams.get("from-place") ||
    searchParams.get("to-district") ||
    searchParams.get("to-place") ||
    searchParams.get("departure_at")
  ) {
    searchParameter = {
      from: {
        district: searchParams.get("from-district")!,
        place: searchParams.get("from-place")!,
      },
      to: {
        district: searchParams.get("to-district")!,
        place: searchParams.get("to-place")!,
      },
      departure_at: searchParams.get("departure_at")!,
    };
  }
  const { data, isError, isSuccess, isLoading } =
    useExploreAndSearchedVehicles(searchParameter);
  return (
    <>
      <HorizontalSearchBox />
      <CardHeader />
      <div className={styles.card_and_filter}>
        <VehicleCards
          travelVehicles={data}
          isError={isError}
          isSuccess={isSuccess}
          isLoading={isLoading}
        />
        <CardFilter />
      </div>
    </>
  );
};

export default MainExplore;

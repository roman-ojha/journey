"use client";
import styles from "@/styles/page/explore/index.module.scss";
import HorizontalSearchBox from "@/components/HorizontalSearchBox/HorizontalSearchBox";
import CardHeader from "@/components/pages/explore/CardHeader/CardHeader";
import CardFilter from "@/components/pages/explore/CardFilter/CardFilter";
import VehicleCards from "@/components/pages/explore/VehicleCards";
import useExploreAndSearchedVehicles from "@/hooks/reactQuery/useExploreAndSearchedVehicles";

const MainExplore = (): React.JSX.Element => {
  const { data, isError, isSuccess, isLoading } =
    useExploreAndSearchedVehicles();
  if (isSuccess) {
  }
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

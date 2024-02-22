"use client";
import styles from "@/styles/page/explore/index.module.scss";
import HorizontalSearchBox from "@/components/HorizontalSearchBox/HorizontalSearchBox";
import CardHeader from "@/components/pages/explore/CardHeader/CardHeader";
import CardFilter from "@/components/pages/explore/CardFilter/CardFilter";
import VehicleCards from "@/components/pages/explore/VehicleCards";
import useExploreAndSearchedVehicles from "@/hooks/reactQuery/userExploreAndSearchedVehicles";

const MainExplore = (): React.JSX.Element => {
  const { data } = useExploreAndSearchedVehicles();
  console.log(data?.data);
  return (
    <>
      <HorizontalSearchBox />
      <CardHeader />
      <div className={styles.card_and_filter}>
        <VehicleCards />
        <CardFilter />
      </div>
    </>
  );
};

export default MainExplore;

import styles from "@/styles/page/explore/index.module.scss";
import HorizontalSearchBox from "@/components/HorizontalSearchBox/HorizontalSearchBox";
import CardHeader from "./CardHeader/CardHeader";
import CardFilter from "./CardFilter/CardFilter";
import VehicleCards from "./VehicleCards";

const MainExplore = (): React.JSX.Element => {
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

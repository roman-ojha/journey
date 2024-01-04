import VehicleCard from "@/components/VehicleCard";
import styles from "@/styles/page/explore/index.module.scss";

const VehicleCards = (): React.JSX.Element => {
  return (
    <section className={styles.card_container}>
      <VehicleCard />
      <VehicleCard />
      <VehicleCard />
      <VehicleCard />
      <VehicleCard />
      <VehicleCard />
      <VehicleCard />
      <VehicleCard />
      <VehicleCard />
      <VehicleCard />
      <VehicleCard />
    </section>
  );
};

export default VehicleCards;

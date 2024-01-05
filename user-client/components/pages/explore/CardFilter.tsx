import AppIcon from "@/components/appIcon/AppIcon";
import styles from "@/styles/page/explore/cardFilter.module.scss";

const CardFilter = (): React.JSX.Element => {
  return (
    <section className={styles.container}>
      <AppIcon iconName="fluent:vehicle-cab-16-filled" use="iconify" />
    </section>
  );
};

export default CardFilter;

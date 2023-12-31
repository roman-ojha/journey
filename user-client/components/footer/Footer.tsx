import Logo from "../Logo";
import styles from "@/styles/components/footer/footer.module.scss";
import AvailableAppSection from "./AvailableAppSection";

const Footer = (): React.JSX.Element => {
  return (
    <footer className={styles.container}>
      <div className={styles.divider}></div>
      <section className={styles.main_footer_section}>
        <div className={styles.main_footer_section__left}>
          <Logo />
          <div className={styles.available_on_container}>
            <h6>Available On</h6>
            <AvailableAppSection title="User App" />
            <AvailableAppSection title="Merchant App" />
          </div>
        </div>
      </section>
      <div className={styles.divider}></div>
    </footer>
  );
};

export default Footer;

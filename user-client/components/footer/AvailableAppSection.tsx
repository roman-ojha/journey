import styles from "@/styles/components/footer/available-on.module.scss";
import AppDownloadOn from "./AppDownloadOn";

interface Props {
  title: string;
}

const AvailableAppSection: React.FC<Props> = ({ title }): React.JSX.Element => {
  return (
    <section className={styles.available_app_section}>
      <div className={styles.available_app_section__title_container}>
        <div
          className={styles.available_app_section__title_container__divider}
        ></div>
        <p>{title}</p>
        <div
          className={styles.available_app_section__title_container__divider}
        ></div>
      </div>
      <div className={styles.available_app_section__app_container}>
        <AppDownloadOn type="app-store" />
        <AppDownloadOn type="google-store" />
      </div>
    </section>
  );
};

export default AvailableAppSection;

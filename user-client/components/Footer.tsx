import Logo from "./Logo";
import styles from "@/styles/components/footer.module.scss";

const Footer = (): React.JSX.Element => {
  return (
    <footer className={styles.container}>
      <div className={styles.divider}></div>
      <div>
        <Logo />
      </div>
    </footer>
  );
};

export default Footer;

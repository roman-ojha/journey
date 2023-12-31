import Image from "next/image";
import appIcon from "@/assets/images/appIcon.png";
import Link from "next/link";
import styles from "@/styles/components/logo.module.scss";

const Logo = (): React.JSX.Element => {
  return (
    <Link href="/" className={styles.logo_container}>
      <Image
        src={appIcon}
        alt="app icon"
        className={styles.logo_container__logo}
      />
      <h5 className={styles.logo_container__text}>Journey</h5>
    </Link>
  );
};

export default Logo;

import { APPLICATION_NAME } from "@/data/constants";
import styles from "@/styles/components/footer/copyright-and-social-links.module.scss";
import Link from "next/link";
import Iconify from "../Iconify";

const CopyRightAndSocialLinks = (): React.JSX.Element => {
  return (
    <section className={styles.container}>
      <div className={styles.left_part}>
        <span className={styles.left_part__copyright}>
          <Iconify
            icon="ph:copyright"
            className={styles.left_part__copyright__icon}
          />
          <p>
            {new Date().getFullYear()} {APPLICATION_NAME}, Inc.
          </p>
        </span>
        <Link href="">Privacy Policy</Link>
        <Link href="">Term and Conditions</Link>
      </div>
      <div className={styles.right_part}>
        <Link href="https://twitter.com/roman__ojha" target="_blank">
          <Iconify icon="pajamas:twitter" className={styles.right_part__icon} />
        </Link>
        <Link href="https://www.facebook.com/razz.Roman.5/" target="_blank">
          <Iconify icon="uil:facebook" className={styles.right_part__icon} />
        </Link>
        <Link href="https://www.instagram.com/roman__ojha/" target="_blank">
          <Iconify icon="mdi:instagram" className={styles.right_part__icon} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/roman-ojha-3b8bb2209/"
          target="_blank"
        >
          <Iconify icon="mdi:linkedin" className={styles.right_part__icon} />
        </Link>
      </div>
    </section>
  );
};

export default CopyRightAndSocialLinks;

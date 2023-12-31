import { APPLICATION_NAME } from "@/constants";
import { Icon } from "@iconify/react";
import styles from "@/styles/components/footer/copyright-and-social-links.module.scss";

const CopyRightAndSocialLinks = (): React.JSX.Element => {
  return (
    <section className={styles.container}>
      <div className={styles.left_part}>
        <span className={styles.left_part__copyright}>
          <Icon
            icon="ph:copyright"
            className={styles.left_part__copyright__icon}
          />
          <p>
            {new Date().getFullYear()} {APPLICATION_NAME}, Inc.
          </p>
        </span>
        <p>Privacy Policy</p>
        <p>Term and Conditions</p>
      </div>
      <div className={styles.right_part}>
        <Icon icon="pajamas:twitter" className={styles.right_part__icon} />
        <Icon icon="uil:facebook" className={styles.right_part__icon} />
        <Icon icon="mdi:instagram" className={styles.right_part__icon} />
        <Icon icon="mdi:linkedin" className={styles.right_part__icon} />
      </div>
    </section>
  );
};

export default CopyRightAndSocialLinks;

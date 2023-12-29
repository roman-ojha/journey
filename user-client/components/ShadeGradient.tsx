import styles from "@/styles/components/shadeGradient.module.scss";

const ShadeGradient = (): React.JSX.Element => {
  return (
    <>
      <div className={styles.background_1st}>
        <div className={styles.background_2nd}></div>
      </div>
    </>
  );
};

export default ShadeGradient;

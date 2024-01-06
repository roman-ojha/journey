import styles from "@/styles/components/reviewAndRating.module.scss";
import AppIcon from "../appIcon/AppIcon";

const RatingSummery = (): React.JSX.Element => {
  return (
    <section className={styles.rating_summery_container}>
      <span className={styles.rating_summery_title}>
        <h5>Service Rating</h5>
      </span>
      <div className={styles.rating_summery}>
        <span className={styles.rating_summery__average}>
          <h2>4.8</h2>
          <span className={styles.rating_summery__average__rating}>
            <AppIcon
              iconName="typcn:star-full-outline"
              use="iconify"
              className={styles.rating_star_icon}
            />
            <AppIcon
              iconName="typcn:star-full-outline"
              use="iconify"
              className={styles.rating_star_icon}
            />
            <AppIcon
              iconName="typcn:star-full-outline"
              use="iconify"
              className={styles.rating_star_icon}
            />
            <AppIcon
              iconName="typcn:star-full-outline"
              use="iconify"
              className={styles.rating_star_icon}
            />
            <AppIcon
              iconName="typcn:star-full-outline"
              use="iconify"
              className={styles.rating_star_icon}
            />
          </span>
          <p>Currently Rating</p>
        </span>
        <div className={styles.rating_summery__rating_detail}>
          <div className={styles.rating_summery__rating_detail__single}>
            <span
              className={styles.rating_summery__rating_detail__single__stars}
            >
              <AppIcon
                iconName="typcn:star-full-outline"
                use="iconify"
                className={styles.rating_star_icon}
              />
              <AppIcon
                iconName="typcn:star-full-outline"
                use="iconify"
                className={styles.rating_star_icon}
              />
              <AppIcon
                iconName="typcn:star-full-outline"
                use="iconify"
                className={styles.rating_star_icon}
              />
              <AppIcon
                iconName="typcn:star-full-outline"
                use="iconify"
                className={styles.rating_star_icon}
              />
              <AppIcon
                iconName="ic:round-star-half"
                use="iconify"
                className={styles.rating_star_icon}
              />
            </span>
            <p>5 Star Rating</p>
            <span
              className={
                styles.rating_summery__rating_detail__single__range_amount
              }
            >
              <span
                className={
                  styles.rating_summery__rating_detail__single__range_amount__viewer
                }
                style={{ width: "80%" }}
              ></span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RatingSummery;

"use client";
import styles from "@/styles/components/reviewAndRating.module.scss";
import AppIcon from "../appIcon/AppIcon";
import { useState } from "react";
import { numberWithCommas } from "@/lib/utils";
import RatingStar from "../RatingStar";

const RatingSummery = (): React.JSX.Element => {
  const [rating, setRating] = useState({
    average: 4.3,
    total: 20012,
    ratingPercent: [80, 30, 40, 10, 4], // in percent [5 star, 4 star, 3, 2, 1]
  });

  return (
    <section className={styles.rating_summery_container}>
      <span className={styles.rating_summery_title}>
        <h5>Service Rating</h5>
      </span>
      <div className={styles.rating_summery}>
        <span className={styles.rating_summery__average}>
          <h2>{rating.average}</h2>
          <span className={styles.rating_summery__average__rating}>
            <RatingStar
              rating={rating.average}
              className={styles.rating_star_icon}
            />
          </span>
          <p>{numberWithCommas(rating.total)}</p>
        </span>
        <div className={styles.rating_summery__rating_detail}>
          {rating.ratingPercent.map((percent, index) => (
            <div
              className={styles.rating_summery__rating_detail__single}
              key={index}
            >
              <span
                className={styles.rating_summery__rating_detail__single__stars}
              >
                <RatingStar
                  rating={5 - index}
                  className={styles.rating_star_icon}
                  key={index}
                />
              </span>
              <p>{5 - index} Star Rating</p>
              <span
                className={
                  styles.rating_summery__rating_detail__single__range_amount
                }
              >
                <span
                  className={
                    styles.rating_summery__rating_detail__single__range_amount__viewer
                  }
                  style={{ width: `${percent}%` }}
                ></span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RatingSummery;

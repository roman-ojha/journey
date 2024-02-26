"use client";
import styles from "@/styles/components/reviewAndRating.module.scss";
import AppIcon from "../appIcon/AppIcon";
import React, { useEffect, useState } from "react";
import { numberWithCommas } from "@/lib/utils";
import RatingStar from "../RatingStar";
import getCssVariable from "@/lib/getCssVariable";
import { Skeleton } from "@mui/material";

type RatingSummeryProps = {
  average_rating: number;
  no_of_reviews: number;
};

const RatingSummery: React.FC<RatingSummeryProps> = ({
  average_rating,
  no_of_reviews,
}): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState({
    average: 4.3,
    total: 20012,
    ratingPercent: [80, 30, 40, 10, 4], // in percent [5 star, 4 star, 3, 2, 1]
  });

  useEffect(() => {
    const tempTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(tempTimeout);
    };
  }, []);

  return (
    <section className={styles.rating_summery_container}>
      <span className={styles.rating_summery_title}>
        <h5>Service Rating</h5>
      </span>
      {isLoading ? (
        <Skeleton
          sx={{
            bgcolor: getCssVariable("--clr-skeleton-background", true),
          }}
          variant="rectangular"
          className="!h-40 w-full rounded-sm"
        />
      ) : (
        <div className={styles.rating_summery}>
          <span className={styles.rating_summery__average}>
            <h2>{average_rating.toFixed(1)}</h2>
            <span className={styles.rating_summery__average__rating}>
              <RatingStar
                rating={average_rating}
                className={styles.rating_star_icon}
              />
            </span>
            <p>{numberWithCommas(no_of_reviews)}</p>
          </span>
          <div className={styles.rating_summery__rating_detail}>
            {rating.ratingPercent.map((percent, index) => (
              <div
                className={styles.rating_summery__rating_detail__single}
                key={index}
              >
                <span
                  className={
                    styles.rating_summery__rating_detail__single__stars
                  }
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
      )}
    </section>
  );
};

export default RatingSummery;

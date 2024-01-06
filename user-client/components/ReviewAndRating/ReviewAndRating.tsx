"use client";
import styles from "@/styles/components/reviewAndRating.module.scss";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getCssVariable from "@/lib/getCssVariable";
import Image from "next/image";
import AppIcon from "../appIcon/AppIcon";
import RatingStar from "../RatingStar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";

type ReviewAndRating = {
  name: string;
  picture: string; // user picture url
  rating: number;
  review: string;
  date: string;
};

const ReviewAndRating = (): React.JSX.Element => {
  const reviews: ReviewAndRating[] = [
    {
      name: "Alice Johnson",
      picture:
        "https://images.unsplash.com/photo-1621592484082-2d05b1290d7a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.5,
      review:
        "I recently purchased this product, and I must say it has exceeded my expectations. The quality is outstanding, and it's clear that the company prioritizes customer satisfaction. The item arrived promptly, and I'm thoroughly impressed. Highly recommend it to others. Will definitely consider buying from them again. Great experience overall!",
      date: "2023-03-15",
    },
    {
      name: "Bob Smith",
      picture:
        "https://images.unsplash.com/photo-1621592484082-2d05b1290d7a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 3.2,
      review:
        "My experience with this product was decent. The quality is acceptable, but there is room for improvement. What impressed me most was the customer service. They were responsive and addressed my concerns promptly. While the product wasn't perfect, the excellent customer support made up for it. I appreciate their efforts.",
      date: "2023-04-02",
    },
    {
      name: "Catherine Davis",
      picture:
        "https://images.unsplash.com/photo-1621592484082-2d05b1290d7a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5.0,
      review:
        "Absolutely fantastic! I can't express how delighted I am with this purchase. The product exceeded my expectations in every way. From the top-notch quality to the fast delivery and excellent customer support, everything was flawless. I highly recommend this company to anyone looking for a great shopping experience.",
      date: "2023-05-10",
    },
    {
      name: "David Miller",
      picture:
        "https://images.unsplash.com/photo-1621592484082-2d05b1290d7a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 2.8,
      review:
        "I must admit I was not very satisfied with this product. It didn't meet my expectations, and I found it to be average at best. The quality was lacking, and I encountered some issues. However, the customer service was responsive and attempted to address my concerns. It was an okay experience, but there's room for improvement.",
      date: "2023-06-21",
    },
    {
      name: "Emily White",
      picture:
        "https://images.unsplash.com/photo-1621592484082-2d05b1290d7a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.7,
      review:
        "Impressive quality and design. From the moment I received the product, I knew I made the right choice. The attention to detail is commendable, and I'm thoroughly satisfied with my purchase. The fast shipping and excellent customer service were the icing on the cake. I will definitely be a repeat customer.",
      date: "2023-07-05",
    },
    {
      name: "Frank Thomas",
      picture:
        "https://images.unsplash.com/photo-1621592484082-2d05b1290d7a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 3.5,
      review:
        "For the price, it's a good value. While there were some minor issues with the product, overall, I am satisfied with my purchase. The customer service was responsive, and they addressed my concerns promptly. It was a decent experience, and I would consider buying from them again in the future.",
      date: "2023-08-12",
    },
    {
      name: "Grace Wilson",
      picture:
        "https://images.unsplash.com/photo-1621592484082-2d05b1290d7a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.0,
      review:
        "Solid product. The quality is evident, and it met my expectations. The fast shipping was appreciated, and I'm happy with my overall experience. The customer service was responsive, making it a smooth and satisfactory transaction. I would recommend this product and the company to others.",
      date: "2023-09-28",
    },
    {
      name: "Henry Taylor",
      picture:
        "https://images.unsplash.com/photo-1621592484082-2d05b1290d7a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.9,
      review:
        "Exceptional service and top-notch quality. I can't express how impressed I am with this company. The product exceeded my expectations, and the overall experience was fantastic. From the prompt delivery to the outstanding customer support, every aspect was flawless. Highly recommend this company to others.",
      date: "2023-10-15",
    },
    {
      name: "Ivy Brown",
      picture:
        "https://images.unsplash.com/photo-1621592484082-2d05b1290d7a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 3.9,
      review:
        "My experience with this product was good overall. The item was as described, and the quality was satisfactory. The prompt delivery and good customer service added to a positive experience. While there were no major issues, there's always room for improvement. I would consider buying from them again.",
      date: "2023-11-07",
    },
    {
      name: "Jake Harris",
      picture:
        "https://images.unsplash.com/photo-1621592484082-2d05b1290d7a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 2.5,
      review:
        "My experience with this product was disappointing. It didn't last as long as expected, and I encountered issues sooner than anticipated. Unfortunately, the customer service was unhelpful in resolving my concerns. Overall, it was not a great experience, and I would caution others before making a purchase.",
      date: "2023-12-22",
    },
  ];

  return (
    <section className={styles.review_and_rating_container}>
      <div className={styles.review_and_rating_heading}>
        <h6>Users Review & Rating</h6>
        <Select>
          <SelectTrigger
            className="w-[180px]"
            style={{
              borderColor: getCssVariable("--clr-container-border"),
              borderRadius: "8px",
              backgroundColor: "transparent",
            }}
          >
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5-star-rating">5 Star Rating</SelectItem>
            <SelectItem value="4-star-rating">4 Star Rating</SelectItem>
            <SelectItem value="3-star-rating">3 Star Rating</SelectItem>
            <SelectItem value="2-star-rating">2 Star Rating</SelectItem>
            <SelectItem value="1-star-rating">1 Star Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className={styles.review_and_ratings}>
        {reviews.map((review, i) => (
          <React.Fragment key={i}>
            <div className={styles.single_review_and_rating}>
              <Avatar>
                {/* <Image
                  src={review.picture}
                  alt="user"
                  className={`aspect-square h-full w-full ${styles.single_review_and_rating__avatar}`}
                  height={40}
                  width={40}
                /> */}
                <AvatarFallback className="capitalize bg-primary">
                  {review.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className={styles.single_review_and_rating__content}>
                <span
                  className={
                    styles.single_review_and_rating__content__name_and_date
                  }
                >
                  <b>{review.name}</b>
                  <AppIcon
                    iconName="radix-icons:dot-filled"
                    use="iconify"
                    className={
                      styles.single_review_and_rating__content__name_and_date__dot
                    }
                  />
                  <p>1 day ago</p>
                </span>
                <span
                  className={styles.single_review_and_rating__content__star}
                >
                  <RatingStar
                    rating={review.rating}
                    className={
                      styles.single_review_and_rating__content__star__icon
                    }
                  />
                </span>
                <p className={styles.single_review_and_rating__content__review}>
                  {review.review}
                </p>
              </div>
            </div>
            <div className={styles.single_review_and_rating__divider}></div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default ReviewAndRating;

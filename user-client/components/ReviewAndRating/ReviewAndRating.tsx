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

const ReviewAndRating = (): React.JSX.Element => {
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
            <SelectValue placeholder="5 Star Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5-star-rating" defaultChecked>
              5 Star Rating
            </SelectItem>
            <SelectItem value="4-star-rating">4 Star Rating</SelectItem>
            <SelectItem value="3-star-rating">3 Star Rating</SelectItem>
            <SelectItem value="2-star-rating">2 Star Rating</SelectItem>
            <SelectItem value="1-star-rating">1 Star Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className={styles.review_and_ratings}>
        <div className={styles.single_review_and_rating}>
          <Avatar>
            <Image
              src="https://images.unsplash.com/photo-1621592484082-2d05b1290d7a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="user"
              className={`aspect-square h-full w-full ${styles.single_review_and_rating__avatar}`}
              height={40}
              width={40}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className={styles.single_review_and_rating__content}>
            <span
              className={
                styles.single_review_and_rating__content__name_and_date
              }
            >
              <b>John Doe</b>
              <AppIcon
                iconName="radix-icons:dot-filled"
                use="iconify"
                className={
                  styles.single_review_and_rating__content__name_and_date__dot
                }
              />
              <p>1 day ago</p>
            </span>
            <span className={styles.single_review_and_rating__content__star}>
              <RatingStar
                rating={5}
                className={styles.single_review_and_rating__content__star__icon}
              />
            </span>
            <p className={styles.single_review_and_rating__content__review}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              sequi non provident sint, illum quia minus distinctio tenetur
              animi id magnam beatae suscipit natus est ad doloribus quis
              dolores soluta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewAndRating;

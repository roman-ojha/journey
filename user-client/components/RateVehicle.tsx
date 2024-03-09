import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AppIcon from "./appIcon/AppIcon";
import styles from "@/styles/components/rateVehicle.module.scss";
import { Textarea } from "./ui/textarea";
import useGetReviewDetailDoneByAuthUser from "@/hooks/reactQuery/useGetReviewDetailDoneByAuthUser";
import { Skeleton } from "@mui/material";
import getCssVariable from "@/lib/getCssVariable";

const RatedStar = ({
  previousRating,
}: {
  previousRating?: number;
}): React.JSX.Element => {
  const [rating, setRating] = useState<{
    hoveredValue: number;
    selectedValue: number;
    mode: "hover" | "selected";
  }>({
    hoveredValue: previousRating || 0,
    selectedValue: previousRating || 0,
    mode: "hover",
  });

  const ratingStars = [
    {
      rating: 0,
      desc: "Give us a rating",
      star: ["outline", "outline", "outline", "outline", "outline"],
    },
    {
      rating: 1,
      desc: "😔 Very Bad",
      star: ["full", "outline", "outline", "outline", "outline"],
    },
    {
      rating: 2,
      desc: "😟 Bad",
      star: ["full", "full", "outline", "outline", "outline"],
    },
    {
      rating: 3,
      desc: "🙂 Good",
      star: ["full", "full", "full", "outline", "outline"],
    },
    {
      rating: 4,
      desc: "😍 Very Good",
      star: ["full", "full", "full", "full", "outline"],
    },
    {
      rating: 4,
      desc: "🥰 Excellent",
      star: ["full", "full", "full", "full", "full"],
    },
  ];

  return (
    <>
      <span className="flex flex-col justify-center items-center gap-2">
        <p>
          {
            ratingStars[
              rating.mode == "hover"
                ? rating.hoveredValue
                : rating.selectedValue
            ].desc
          }
        </p>
        <span className="flex gap-2">
          {ratingStars[
            rating.mode == "hover" ? rating.hoveredValue : rating.selectedValue
          ].star.map((star, index) => {
            return (
              <AppIcon
                iconName={
                  star == "full"
                    ? "typcn:star-full-outline"
                    : star == "half"
                    ? "ic:round-star-half"
                    : "typcn:star-outline"
                }
                use="iconify"
                className="text-3xl text-rating-star cursor-pointer"
                key={index}
                onMouseEnter={() =>
                  setRating({
                    ...rating,
                    hoveredValue: index + 1,
                  })
                }
                onClick={() =>
                  setRating({
                    ...rating,
                    selectedValue: index + 1,
                    mode: "selected",
                  })
                }
              />
            );
          })}
        </span>
      </span>
    </>
  );
};

export default RatedStar;

export function RateVehicle({
  rating,
  vehicle_id,
}: {
  rating?: number;
  vehicle_id: string;
}) {
  const { data, isLoading, isError, error } =
    useGetReviewDetailDoneByAuthUser(vehicle_id);
  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        sx={{
          bgcolor: getCssVariable("--clr-skeleton-background", true),
        }}
        className="w-16 rounded-sm"
      />
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className={styles.vehicle_info_rate_vehicle}>
          {data?.data.data ? (
            <>
              <p>Your Rating: {data.data.data.rating}/5</p>
            </>
          ) : (
            <>
              <AppIcon
                iconName="typcn:star-outline"
                use="iconify"
                className={styles.vehicle_rating_icon}
              />
              <p>Rate</p>
            </>
          )}
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate & Review Vehicle</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <RatedStar previousRating={data?.data?.data.rating} />
          <Textarea
            placeholder="Tell us about your experience with this vehicle"
            className="resize-none"
            value={data?.data?.data?.review}
          />
        </div>
        <DialogFooter>
          <Button className="w-full" type="submit">
            Rate and Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
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
import { useAppSelector } from "@/hooks/useAppStore";
import { authUserSelector } from "@/services/store/features/authUser/authUserSlice";
import { useRouter, usePathname } from "next/navigation";
import useReviewVehicleMutation from "@/hooks/reactMutation/userReviewVehicleMutation";

export function RateVehicle({ vehicle_id }: { vehicle_id: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchReviewDetail,
  } = useGetReviewDetailDoneByAuthUser(vehicle_id);
  const isAuthenticated = useAppSelector((state) =>
    authUserSelector.isAuthenticated(state)
  );
  const [ratingForm, setRating] = useState<{
    hoveredValue: number;
    selectedValue: number;
    mode: "hover" | "selected";
  }>({
    hoveredValue: 0,
    selectedValue: 0,
    mode: "hover",
  });

  const reviewVehicleMut = useReviewVehicleMutation();

  const [reviewForm, setReview] = useState<string>("");

  const closeDialogButton = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setReview(data?.data?.data?.review || "");
    setRating((prev) => ({
      ...prev,
      selectedValue: data?.data?.data?.rating || 0,
      hoveredValue: data?.data?.data?.rating || 0,
    }));
  }, [data?.data?.data?.review, data?.data?.data?.rating]);

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

  const rateAndReviewVehicle = () => {
    if (!isAuthenticated) router.push("/login?next=" + pathname);
    reviewVehicleMut.mutate({
      vehicle_id,
      rating: ratingForm.selectedValue,
      review: reviewForm,
    });
  };

  useEffect(() => {
    refetchReviewDetail();
  }, [isAuthenticated, refetchReviewDetail]);

  useEffect(() => {
    if (reviewVehicleMut.isSuccess) {
      refetchReviewDetail();
      closeDialogButton.current?.click();
    }
  }, [refetchReviewDetail, reviewVehicleMut.isSuccess]);

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
  if (isError) {
    return <>Error...</>;
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
          <span className="flex flex-col justify-center items-center gap-2">
            <p>
              {
                ratingStars[
                  ratingForm.mode == "hover"
                    ? ratingForm.hoveredValue
                    : ratingForm.selectedValue
                ].desc
              }
            </p>
            <span
              className="flex gap-2"
              onMouseLeave={() => {
                setRating({
                  ...ratingForm,
                  hoveredValue: ratingForm.selectedValue,
                  mode: "hover",
                });
              }}
            >
              {ratingStars[
                ratingForm.mode == "hover"
                  ? ratingForm.hoveredValue
                  : ratingForm.selectedValue
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
                        ...ratingForm,
                        hoveredValue: index + 1,
                      })
                    }
                    onClick={() =>
                      setRating({
                        ...ratingForm,
                        selectedValue: index + 1,
                        mode: "selected",
                      })
                    }
                  />
                );
              })}
            </span>
          </span>
          <Textarea
            placeholder="Tell us about your experience with this vehicle"
            className="resize-none"
            value={reviewForm}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            type="submit"
            onClick={rateAndReviewVehicle}
          >
            Rate and Review
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              ref={closeDialogButton}
              style={{ display: "none" }}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

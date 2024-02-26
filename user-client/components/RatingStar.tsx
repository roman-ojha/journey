import AppIcon from "./appIcon/AppIcon";

type RatingStarProps = {
  rating: number;
  className?: string;
};

const RatingStar: React.FC<RatingStarProps> = ({
  rating,
  className,
}): React.JSX.Element => {
  function generateRatingStar(rating: number): ("full" | "outline" | "half")[] {
    if (rating >= 0 && rating <= 0.25)
      return ["outline", "outline", "outline", "outline", "outline"];
    if (rating > 0.25 && rating <= 0.5)
      return ["half", "outline", "outline", "outline", "outline"];
    if (rating > 0.5 && rating <= 1.25)
      return ["full", "outline", "outline", "outline", "outline"];
    else if (rating > 1.25 && rating <= 1.75)
      return ["full", "half", "outline", "outline", "outline"];
    else if (rating > 1.75 && rating <= 2.25)
      return ["full", "full", "outline", "outline", "outline"];
    else if (rating > 2.25 && rating <= 2.75)
      return ["full", "full", "half", "outline", "outline"];
    else if (rating > 2.75 && rating <= 3.25)
      return ["full", "full", "full", "outline", "outline"];
    else if (rating > 3.25 && rating <= 3.75)
      return ["full", "full", "full", "half", "outline"];
    else if (rating > 3.75 && rating <= 4.25)
      return ["full", "full", "full", "full", "outline"];
    else if (rating > 4.25 && rating <= 4.75)
      return ["full", "full", "full", "full", "half"];
    else if (rating > 4.75 && rating <= 5)
      return ["full", "full", "full", "full", "full"];
    else return [];
  }

  return (
    <>
      {generateRatingStar(rating).map((star, index) => {
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
            className={className}
            key={index}
          />
        );
      })}
    </>
  );
};

export default RatingStar;

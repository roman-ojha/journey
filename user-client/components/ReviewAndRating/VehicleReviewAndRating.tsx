import ReviewAndRating from "@/components/ReviewAndRating/ReviewAndRating";
import ServiceRating from "@/components/ReviewAndRating/RatingSummery";
import styles from "@/styles/page/vehicle/index.module.scss";

type VehicleReviewAndRatingProps = {
  average_rating: number;
  no_of_reviews: number;
};

const VehicleReviewAndRating: React.FC<VehicleReviewAndRatingProps> = ({
  average_rating,
  no_of_reviews,
}): React.JSX.Element => {
  return (
    <section className={styles.vehicle_review_and_rating}>
      <ServiceRating
        average_rating={average_rating}
        no_of_reviews={no_of_reviews}
      />
      <ReviewAndRating />
    </section>
  );
};

export default VehicleReviewAndRating;

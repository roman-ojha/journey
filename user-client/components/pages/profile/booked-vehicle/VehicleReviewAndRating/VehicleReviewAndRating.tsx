import ReviewAndRating from "@/components/ReviewAndRating/ReviewAndRating";
import ServiceRating from "@/components/ReviewAndRating/RatingSummery";
import styles from "@/styles/page/vehicle/index.module.scss";

const VehicleReviewAndRating = (): React.JSX.Element => {
  return (
    <section className={styles.vehicle_review_and_rating}>
      <ServiceRating />
      <ReviewAndRating />
    </section>
  );
};

export default VehicleReviewAndRating;

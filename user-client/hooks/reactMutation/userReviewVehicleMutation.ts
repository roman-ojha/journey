import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRoutes, {
  APIFailResponse,
  APISuccessResponse,
} from "@/services/api/routes";
import { AxiosError } from "axios";
import queryKeys from "@/data/queryKeys";
import { VehicleReview } from "@/schema/VehicleReview";
import { Vehicle } from "@/schema/Vehicle";

type ReviewVehicleMutationData = {
  vehicle_id: string;
  rating: number;
  review: string;
};

const reviewVehicle = async ({
  vehicle_id,
  rating,
  review,
}: ReviewVehicleMutationData) =>
  apiRoutes.user.review.review_vehicle(vehicle_id, rating, review);

export default function useReviewVehicleMutation() {
  const res = useMutation<
    APISuccessResponse<VehicleReview>,
    APIFailResponse,
    ReviewVehicleMutationData
  >({
    mutationFn: reviewVehicle,
    onSuccess: (data) => {},
  });
  return res;
}

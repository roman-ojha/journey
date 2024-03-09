import { District } from "@/schema/District";
import { Place } from "@/schema/Place";
import { VehicleReview } from "@/schema/VehicleReview";
import apiRoutes, { APISuccessResponse } from "@/services/api/routes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const fetchReviewDoneByAuthUser = async (vehicle_id: string) =>
  await apiRoutes.user.review.get_review_done_by_auth_user(vehicle_id);

export default function useGetReviewDetailDoneByAuthUser(vehicle_id: string) {
  return useQuery<APISuccessResponse<VehicleReview>, AxiosError>({
    queryKey: ["review-done-by-auth-user", vehicle_id],
    queryFn: () => fetchReviewDoneByAuthUser(vehicle_id),
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
  });
}

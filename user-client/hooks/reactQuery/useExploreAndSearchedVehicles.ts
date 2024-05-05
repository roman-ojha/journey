import { SearchParameterObj } from "@/app/explore/_components/VehicleCards";
import queryKeys from "@/data/queryKeys";
import { District } from "@/schema/District";
import { Place } from "@/schema/Place";
import { Travel } from "@/schema/Travel";
import { Vehicle } from "@/schema/Vehicle";
import { VehicleImage } from "@/schema/VehicleImage";
import { VehicleModel } from "@/schema/VehicleModel";
import apiRoutes from "@/services/api/routes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useAppSelector } from "../useAppStore";

const fetchExploreVehicle = async (
  searchParams: SearchParameterObj | null = null,
  userId: number | null,
) => await apiRoutes.user.vehicle.explore(searchParams, userId);

export type ExploreVehicle = Travel & {
  from_place: Place & {
    district: District;
  };
  to_place: Place & {
    district: District;
  };
  vehicle: Vehicle & {
    model: VehicleModel;
    images: VehicleImage[];
  };
  //NOTE: just adding rating & no_of_reviews we aren't getting from the server right now
  average_rating: number;
  no_of_reviews: number;
};

export default function useExploreAndSearchedVehicles(
  searchParams: SearchParameterObj | null,
) {
  // Temporary getting user_id
  const authUser = useAppSelector((state) => state.authUser);
  // eslint-disable-next-line @tanstack/query/no-rest-destructuring
  const userId = authUser.id == 0 ? 8 : authUser.id;
  return useQuery<AxiosResponse<ExploreVehicle[]>, AxiosError>({
    queryKey: queryKeys.exploreOrSearchedVehicles(searchParams, userId),
    queryFn: () => fetchExploreVehicle(searchParams, userId),
    staleTime: 1000 * 60 * 10, // 10 minute
  });
}

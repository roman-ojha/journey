import { SearchParameterObj } from "@/components/pages/explore/Main";
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

const fetchExploreVehicle = async (
  searchParams: SearchParameterObj | null = null
) => await apiRoutes.user.vehicle.explore(searchParams);

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
  searchParams: SearchParameterObj | null
) {
  // eslint-disable-next-line @tanstack/query/no-rest-destructuring
  return useQuery<AxiosResponse<ExploreVehicle[]>, AxiosError>({
    queryKey: queryKeys.exploreOrSearchedVehicles(searchParams),
    queryFn: () => fetchExploreVehicle(searchParams),
    staleTime: 1000 * 60 * 10, // 10 minute
  });
}

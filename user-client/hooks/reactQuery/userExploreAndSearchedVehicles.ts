import { Travel } from "@/schema/Travel";
import apiRoutes, { APISuccessResponse } from "@/services/api/routes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const fetchExploreVehicle = async () => await apiRoutes.user.vehicle.explore();

export default function useExploreAndSearchedVehicles() {
  return useQuery<APISuccessResponse<Travel[]>, AxiosError>({
    queryKey: ["explore-vehicles"],
    queryFn: fetchExploreVehicle,
  });
}

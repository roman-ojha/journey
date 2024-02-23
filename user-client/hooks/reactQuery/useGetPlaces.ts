import { District } from "@/schema/District";
import { Place } from "@/schema/Place";
import apiRoutes from "@/services/api/routes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export type PlacesDetail = District & {
  places: Place[];
};

const fetchPlaces = async () => await apiRoutes.user.vehicle.places();

export default function useGetPlaces() {
  return useQuery<AxiosResponse<PlacesDetail[]>, AxiosError>({
    queryKey: ["places"],
    queryFn: fetchPlaces,
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
  });
}

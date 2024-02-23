import { District } from "@/schema/District";
import { Place } from "@/schema/Place";
import { Travel } from "@/schema/Travel";
import { Vehicle } from "@/schema/Vehicle";
import { VehicleImage } from "@/schema/VehicleImage";
import { VehicleModel } from "@/schema/VehicleModel";
import apiRoutes, { APISuccessResponse } from "@/services/api/routes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const fetchExploreVehicle = async () => await apiRoutes.user.vehicle.explore();

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
  // just adding rating & no_of_reviews we aren't getting from the server right now
  rating: number;
  no_of_reviews: number;
};

export default function useExploreAndSearchedVehicles() {
  // eslint-disable-next-line @tanstack/query/no-rest-destructuring
  const { data, ...kwargs } = useQuery<
    AxiosResponse<ExploreVehicle[]>,
    AxiosError
  >({
    queryKey: ["explore-vehicles"],
    queryFn: fetchExploreVehicle,
  });

  return {
    ...kwargs,
    data: data?.data.map((vehicle): ExploreVehicle => {
      return {
        ...vehicle,
        rating: 5,
        no_of_reviews: Math.floor(Math.random() * 100000),
      };
    }),
  };
}

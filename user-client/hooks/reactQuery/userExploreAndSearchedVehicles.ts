import { Travel } from "@/schema/Travel";
import apiRoutes, { APISuccessResponse } from "@/services/api/routes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const fetchExploreVehicle = async () => await apiRoutes.user.vehicle.explore();

// just to add rating & no_of_reviews we are using this type
export type TempVehicleType = Travel & {
  rating: number;
  no_of_reviews: number;
};

export default function useExploreAndSearchedVehicles() {
  // eslint-disable-next-line @tanstack/query/no-rest-destructuring
  const { data, ...kwargs } = useQuery<AxiosResponse<Travel[]>, AxiosError>({
    queryKey: ["explore-vehicles"],
    queryFn: fetchExploreVehicle,
  });

  return {
    ...kwargs,
    data: data?.data.map((vehicle): TempVehicleType => {
      return {
        ...vehicle,
        rating: 5,
        no_of_reviews: Math.floor(Math.random() * 100000),
      };
    }),
  };
}

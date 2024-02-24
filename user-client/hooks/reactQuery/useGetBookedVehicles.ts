import { VehicleSeat } from "@/schema/VehicleSeat";
import { District } from "@/schema/District";
import { ModelSeat } from "@/schema/ModelSeat";
import { Place } from "@/schema/Place";
import { Travel } from "@/schema/Travel";
import { Vehicle } from "@/schema/Vehicle";
import { VehicleImage } from "@/schema/VehicleImage";
import { VehicleModel } from "@/schema/VehicleModel";
import apiRoutes, { APISuccessResponse } from "@/services/api/routes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export type BookedVehiclesDetail = Vehicle & {
  model: VehicleModel;
  image: VehicleImage;
  travel: Travel;
  //NOTE: just adding rating & no_of_reviews we aren't getting from the server right now
  rating: number;
  no_of_reviews: number;
};

const fetchBookedVehicles = async () =>
  await apiRoutes.user.booking.get_booked_vehicles();

export default function useGetBookedVehicles() {
  // eslint-disable-next-line @tanstack/query/no-rest-destructuring
  const { data, ...kwargs } = useQuery<
    APISuccessResponse<BookedVehiclesDetail[]>,
    AxiosError
  >({
    queryKey: ["profile-booked-vehicles"],
    queryFn: () => fetchBookedVehicles(),
    staleTime: 1000 * 60 * 5, // 5 minute
  });

  // For temporary we are adding rating and no_of_reviews
  return {
    ...kwargs,
    data: data?.data.data.map((vehicle): BookedVehiclesDetail => {
      return {
        ...vehicle,
        rating: 5,
        no_of_reviews: Math.floor(Math.random() * 100000),
      };
    }),
  };
}

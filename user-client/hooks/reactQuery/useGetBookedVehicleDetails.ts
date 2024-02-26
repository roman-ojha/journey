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

export type BookedVehicleDetails = Vehicle & {
  model: VehicleModel;
  images: VehicleImage[];
  travel: Travel & {
    from_place: Place & {
      district: District;
    };
    to_place: Place & {
      district: District;
    };
  };
  seats: VehicleSeat &
    {
      seat: ModelSeat;
    }[];
  //NOTE: just adding rating & no_of_reviews we aren't getting from the server right now
  average_rating: number;
  no_of_reviews: number;
};

const fetchBookedVehicleDetails = async (vehicle_slug: string) =>
  await apiRoutes.user.booking.get_booked_vehicle_details(vehicle_slug);

export default function useGetBookedVehicleDetails(vehicle_slug: string) {
  // eslint-disable-next-line @tanstack/query/no-rest-destructuring
  return useQuery<APISuccessResponse<BookedVehicleDetails>, AxiosError>({
    queryKey: ["booked-vehicle", vehicle_slug],
    queryFn: () => fetchBookedVehicleDetails(vehicle_slug),
    staleTime: 1000 * 60 * 5, // 5 minute
  });
}

import { VehicleSeat } from "@/schema/VehicleSeat";
import { District } from "@/schema/District";
import { ModelSeat } from "@/schema/ModelSeat";
import { Place } from "@/schema/Place";
import { Travel } from "@/schema/Travel";
import { Vehicle } from "@/schema/Vehicle";
import { VehicleImage } from "@/schema/VehicleImage";
import { VehicleModel } from "@/schema/VehicleModel";
import apiRoutes from "@/services/api/routes";
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
  rating: number;
  no_of_reviews: number;
};

const fetchVehicleDetail = async (vehicle_slug: string) =>
  await apiRoutes.user.vehicle.vehicle_detail(vehicle_slug);

export default function useVehicleDetail(vehicle_slug: string) {
  // eslint-disable-next-line @tanstack/query/no-rest-destructuring
  const { data, ...kwargs } = useQuery<
    AxiosResponse<BookedVehicleDetails>,
    AxiosError
  >({
    queryKey: ["vehicle", vehicle_slug],
    queryFn: () => fetchVehicleDetail(vehicle_slug),
    staleTime: 1000 * 60 * 5, // 5 minute
  });

  // For temporary we are adding rating and no_of_reviews
  return {
    ...kwargs,
    data: {
      data: {
        ...data?.data,
        rating: 5,
        no_of_reviews: Math.floor(Math.random() * 100000),
      },
    },
  };
}

"use client";

import SuperDeluxeBusSeats from "./SuperDeluxBusSeats/SuperDeluxBusSeats";
import getCssVariable from "@/lib/getCssVariable";
import { Skeleton } from "@mui/material";
import { VehicleSeatsInfoProps } from "../pages/vehicle/VehicleSeatsInfo/VehicleSeatsInfo";

// type VehicleSeatsProps = {
//   vehicleType: VehicleModel["name"];
// };

const VehicleSeats: React.FC<VehicleSeatsInfoProps> = ({
  vehicleType,
  isLoading,
  isError,
  isSuccess,
  seats,
}): React.JSX.Element => {
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   const tempTimeout = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(tempTimeout);
  //   };
  // }, []);

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {isLoading ? (
        <div className="w-1/2 h-96">
          <Skeleton
            sx={{ bgcolor: getCssVariable("--clr-skeleton-background", true) }}
            variant="rectangular"
            className="!h-full rounded-md"
          />
        </div>
      ) : vehicleType && seats ? (
        <SuperDeluxeBusSeats
          seats={seats}
          isSuccess={isSuccess}
          vehicleType={vehicleType}
        />
      ) : null}
    </>
  );
};

export default VehicleSeats;

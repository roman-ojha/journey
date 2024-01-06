"use client";

import { useEffect, useState } from "react";
import SuperDeluxeBusSeats from "./SuperDeluxBusSeats/SuperDeluxBusSeats";
import getCssVariable from "@/lib/getCssVariable";
import { Skeleton } from "@mui/material";

type VehicleSeatsProps = {
  vehicleType: "SUPER_DELUXE_BUS" | "HIASE";
};

const VehicleSeats: React.FC<VehicleSeatsProps> = ({
  vehicleType,
}): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const tempTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(tempTimeout);
    };
  }, []);

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
      ) : (
        vehicleType == "SUPER_DELUXE_BUS" && <SuperDeluxeBusSeats />
      )}
    </>
  );
};

export default VehicleSeats;

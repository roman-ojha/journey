import z from "zod";
import { vehicleModelSchema } from "./VehicleModel";
import { vehicleSeatSchema } from "./VehicleSeat";
import { vehicleImage } from "./VehicleImage";

export const vehicleSchema = z.object({
  id: z.string(),
  plate_no: z.string(),
  name: z.string(),
  slug: z.string(),
  merchant_id: z.number(),
  model: vehicleModelSchema,
  seats: z.array(vehicleSeatSchema),
  images: z.array(vehicleImage),
});

export type Vehicle = z.infer<typeof vehicleSchema>;

import z from "zod";
import { vehicleModelSchema } from "./VehicleModel";
import { vehicleSeatSchema } from "./VehicleSeat";

export const vehicleSchema = z.object({
  id: z.string(),
  plate_no: z.string(),
  merchant_id: z.number(),
  model: vehicleModelSchema,
  seats: z.array(vehicleSeatSchema),
});

export type Vehicle = z.infer<typeof vehicleSchema>;

import z from "zod";
import { vehicleModelSchema } from "./VehicleModel";

export const modelSeatSchema = z.object({
  id: z.string(),
  name: z.number(),
  //   vehicle_model: vehicleModelSchema,
});

export type ModelSeat = z.infer<typeof modelSeatSchema>;

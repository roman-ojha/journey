import z from "zod";
import { vehicleModelSchema } from "./VehicleModel";

export const modelSeatSchema = z.object({
  _id: z.string(),
  name: z.string(),
  //   vehicle_model: vehicleModelSchema,
});

export type ModelSeat = z.infer<typeof modelSeatSchema>;

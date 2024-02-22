import z from "zod";
import { modelSeatSchema } from "./ModelSeat";

export const vehicleSeatSchema = z.object({
  id: z.string(),
  price: z.number(),
  is_booked: z.boolean(),
  no_of_seats: z.string(),
  seat: modelSeatSchema,
});

export type VehicleSeat = z.infer<typeof vehicleSeatSchema>;

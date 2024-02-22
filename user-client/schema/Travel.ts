import z from "zod";
import { placeSchema } from "./Place";
import { vehicleSchema } from "./Vehicle";

export const travelSchema = z.object({
  id: z.string(),
  from_place: placeSchema,
  to_place: placeSchema,
  is_active: z.boolean().default(true),
  seat_average_price: z.number(),
  departure_at: z.date(),
  route: z.string().nullable(),
  driver_no: z.number(),
  vehicle: vehicleSchema,
});

export type Travel = z.infer<typeof travelSchema>;

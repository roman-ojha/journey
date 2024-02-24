import z from "zod";

export const vehicleSeatSchema = z.object({
  _id: z.string(),
  price: z.number(),
  is_booked: z.boolean(),
  no_of_seats: z.string(),
  user_id: z.number(),
});

export type VehicleSeat = z.infer<typeof vehicleSeatSchema>;

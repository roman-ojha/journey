import z from "zod";

export const vehicleSeatSchema = z.object({
  id: z.string(),
  price: z.number(),
  is_booked: z.boolean(),
  no_of_seats: z.string(),
});

export type VehicleSeat = z.infer<typeof vehicleSeatSchema>;

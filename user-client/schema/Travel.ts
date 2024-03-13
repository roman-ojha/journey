import z from "zod";

export const travelSchema = z.object({
  _id: z.string(),
  from: z.string(),
  to: z.string(),
  is_active: z.boolean().default(true),
  seat_average_price: z.number(),
  departure_at: z.string(),
  route: z.string().nullable(),
  driver_no: z.number(),
  vehicle_id: z.string(),
});

export type Travel = z.infer<typeof travelSchema>;

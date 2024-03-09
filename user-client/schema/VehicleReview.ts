import z from "zod";

export const vehicleReviewResponseSchema = z.object({
  _id: z.string(),
  user_id: z.number(),
  review: z.string(),
  rating: z.number(),
  updated_at: z.date(),
});

export const vehicleReviewSchema = vehicleReviewResponseSchema.extend({
  created_at: z.date(),
  vehicle_id: z.string(),
});

export type VehicleReview = z.infer<typeof vehicleReviewSchema>;

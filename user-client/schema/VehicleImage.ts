import z from "zod";

export const vehicleImage = z.object({
  _id: z.string(),
  image: z.string(),
});

export type VehicleImage = z.infer<typeof vehicleImage>;

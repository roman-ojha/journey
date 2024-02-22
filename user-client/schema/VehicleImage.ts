import z from "zod";

export const vehicleImage = z.object({
  id: z.string(),
  image: z.string(),
});

export type VehicleImage = z.infer<typeof vehicleImage>;

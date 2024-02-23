import z from "zod";

export const vehicleModelSchema = z.object({
  id: z.string(),
  name: z.enum(["SUPER_DELUX_BUS", "HIASE"]),
  no_of_seats: z.string(),
});

export type VehicleModel = z.infer<typeof vehicleModelSchema>;

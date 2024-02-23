import z from "zod";

export const vehicleSchema = z.object({
  id: z.string(),
  plate_no: z.string(),
  name: z.string(),
  slug: z.string(),
  merchant_id: z.number(),
});

export type Vehicle = z.infer<typeof vehicleSchema>;

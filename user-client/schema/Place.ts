import z from "zod";
import { districtSchema } from "./District";

export const placeSchema = z.object({
  id: z.string(),
  name: z.string(),
  district: districtSchema,
});

export type Place = z.infer<typeof placeSchema>;

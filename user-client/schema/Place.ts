import z from "zod";

export const placeSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Place = z.infer<typeof placeSchema>;

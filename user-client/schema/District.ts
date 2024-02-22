import z from "zod";

export const districtSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type District = z.infer<typeof districtSchema>;

import { z } from "zod";

export const signUpSchema = z.object({
  id: z.bigint().nullable(),
  email: z.string().email(),
  f_name: z.string().min(3).max(25),
  l_name: z.string().min(3).max(25),
  password: z.string().min(6).max(25),
  c_password: z.string().min(6).max(25),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  number: z.number(),
  picture: z.string().nullable(),
});

type User = z.infer<typeof signUpSchema>;

export default User;

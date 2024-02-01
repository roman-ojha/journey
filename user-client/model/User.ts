import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    f_name: z
      .string({
        required_error: "First name is required",
      })
      .min(3)
      .max(25),
    l_name: z
      .string({
        required_error: "Last name is required",
      })
      .min(3)
      .max(25),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6)
      .max(25),
    c_password: z
      .string({
        required_error: "Confirm Password is required",
      })
      .min(6)
      .max(25),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
      required_error: "Gender is required",
    }),
    number: z
      .number({
        required_error: "Number is required",
        invalid_type_error: "Invalid Number",
      })
      .min(10),
  })
  .refine((data) => data.password === data.c_password, {
    message: "Password and confirm password didn't match",
    path: ["c_password"],
  });

export type UserSignUp = z.infer<typeof signUpSchema>;

export const userLoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6)
    .max(25),
});

export type UserLogin = z.infer<typeof userLoginSchema>;

type User = {
  id: bigint;
  picture: string;
} & UserSignUp;

export default User;

import z from "zod";

export const baseUserSchema = z.object({
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
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "Gender is required",
  }),
  number: z
    .number({
      required_error: "Number is required",
      invalid_type_error: "Invalid Number",
    })
    .min(10),
});

export const baseUserWithSecret = baseUserSchema.extend({
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
});

export const signUpSchema = baseUserWithSecret.refine(
  (data) => data.password === data.c_password,
  {
    message: "Password and confirm password didn't match",
    path: ["c_password"],
  }
);

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

export const userSchema = baseUserSchema.extend({
  id: z.number(),
  picture: z.string(),
});

export const UserLoginResponse = z.object({
  token: z.string(),
  user: userSchema,
});

export type UserLoginResponse = z.infer<typeof UserLoginResponse>;

export type UserLogoutResponse = {
  token: null;
  user: null;
};

const user = userSchema.merge(baseUserWithSecret);

type User = z.infer<typeof user>;

export type SafeUser = z.infer<typeof userSchema>;

export default User;

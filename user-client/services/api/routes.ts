import { client } from "./axios";
import { AxiosError, AxiosResponse } from "axios";
import User, { UserSignUp } from "@/model/User";

export type APISuccessResponse<T> = AxiosResponse<{
  message: string;
  data: T;
}>;

export type APIValidationErrorResponse = {
  message: string;
  errors: { [key: string]: string[] };
};

const apiRoutes = {
  user: {
    auth: {
      register: async (data: UserSignUp): Promise<APISuccessResponse<User>> => {
        return await client({
          method: "POST",
          url: "/user/auth/register",
          headers: {
            "Content-Type": "application/json",
          },
          data,
        });
      },
    },
  },
};

export default apiRoutes;

import { client } from "./axios";
import { AxiosError, AxiosResponse } from "axios";
import User, { UserSignUp } from "@/model/User";

type APISuccessResponse<T> = AxiosResponse<{
  message: string;
  data: T;
}>;

const apiRoutes = {
  user: {
    auth: {
      register: async (
        data: UserSignUp
      ): Promise<APISuccessResponse<User> | AxiosError<unknown, any>> => {
        try {
          return await client({
            method: "POST",
            url: "/user/auth/register",
            headers: {
              "Content-Type": "application/json",
            },
            data,
          });
        } catch (error) {
          return error as AxiosError;
        }
      },
    },
  },
};

export default apiRoutes;

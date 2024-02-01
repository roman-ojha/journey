import { client as axios } from "./axios";
import { AxiosError, AxiosResponse } from "axios";
import User, { UserSignUp, UserLogin } from "@/model/User";

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
        return await axios({
          method: "POST",
          url: "/user/auth/register",
          headers: {
            "Content-Type": "application/json",
          },
          data,
        });
      },
      login: async (data: UserLogin): Promise<APISuccessResponse<User>> => {
        return await axios({
          method: "POST",
          url: "/user/auth/login",
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

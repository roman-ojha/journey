import { useMutation } from "@tanstack/react-query";
import apiRoutes, {
  APISuccessResponse,
  APIValidationErrorResponse,
} from "@/services/api/routes";
import User, { UserSignUp } from "@/schema/User";
import { AxiosError } from "axios";

const registerUser = (data: UserSignUp) => apiRoutes.user.auth.register(data);

export default function useRegisterUser() {
  return useMutation<APISuccessResponse<User>, AxiosError, UserSignUp>({
    mutationFn: registerUser,
  });
}

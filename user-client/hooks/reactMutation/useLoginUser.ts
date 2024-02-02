import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRoutes, { APISuccessResponse } from "@/services/api/routes";
import User, { UserLogin } from "@/model/User";
import { AxiosError } from "axios";

//
const loginUser = (data: UserLogin) => apiRoutes.user.auth.login(data);

export default function useLoginUser() {
  const queryClient = useQueryClient();
  return useMutation<APISuccessResponse<User>, AxiosError, UserLogin>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data.data);
    },
  });
}

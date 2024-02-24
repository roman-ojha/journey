import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRoutes, {
  APIFailResponse,
  APISuccessResponse,
} from "@/services/api/routes";
import User, { UserLogin, UserLoginResponse } from "@/schema/User";
import { AxiosError } from "axios";
import queryKeys from "@/data/queryKeys";

//
const loginUser = (data: UserLogin) => apiRoutes.user.auth.login(data);

export default function useLoginUser() {
  const queryClient = useQueryClient();
  return useMutation<
    APISuccessResponse<UserLoginResponse>,
    APIFailResponse,
    UserLogin
  >({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.authUser, data.data.data.user);
      // queryClient.refetchQueries({
      //   queryKey: queryKeys.authUser,
      //   type: "all",
      //   exact: true,
      //   stale: true,
      // });
    },
  });
}

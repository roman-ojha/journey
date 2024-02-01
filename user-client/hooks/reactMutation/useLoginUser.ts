import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRoutes from "@/services/api/routes";
import { UserLogin } from "@/model/User";

//
const loginUser = (data: UserLogin) => apiRoutes.user.auth.login(data);

export default function useLoginUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data.data);
    },
  });
}

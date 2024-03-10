import queryKeys from "@/data/queryKeys";
import { UserLogoutResponse } from "@/schema/User";
import apiRoutes, { APISuccessResponse } from "@/services/api/routes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useAppDispatch } from "../useAppStore";
import { setAuthUser } from "@/services/store/features/authUser/authUserSlice";
import { initialState as initialAuthUserState } from "@/services/store/features/authUser/authUserSlice";

const logoutUser = async () => await apiRoutes.user.auth.logout();

export default function useLogoutUserQuery(refetchUser: any) {
  // eslint-disable-next-line @tanstack/query/no-rest-destructuring
  const { ...args } = useQuery<
    APISuccessResponse<UserLogoutResponse>,
    AxiosError
  >({
    queryKey: [queryKeys.authUser],
    queryFn: logoutUser,
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
    enabled: false,
  });

  const dispatch = useAppDispatch();

  if (args.isSuccess) {
    dispatch(setAuthUser(initialAuthUserState));
    refetchUser();
  }

  return { ...args };
}

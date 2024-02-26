import queryKeys from "@/data/queryKeys";
import { SafeUser } from "@/schema/User";
import apiRoutes from "@/services/api/routes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useAppDispatch } from "../useAppStore";
import { setAuthUser } from "@/services/store/features/authUser/authUserSlice";

const fetchAuthUser = async () => await apiRoutes.user.auth.profile();

export default function useGetAuthUserQuery({
  ...options
}: {
  retry: boolean;
  enabled?: boolean;
}) {
  const dispatch = useAppDispatch();
  const res = useQuery<AxiosResponse<SafeUser>, AxiosError>({
    queryKey: queryKeys.authUser,
    queryFn: fetchAuthUser,
    staleTime: 1000 * 60 * 60 * 24, // 2 hours
    retry: options.retry,
    enabled: options.enabled,
  });
  if (res.isSuccess) {
    dispatch(setAuthUser(res.data.data));
  }
  return res;
}

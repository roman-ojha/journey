import queryKeys from "@/data/queryKeys";
import { SafeUser } from "@/schema/User";
import apiRoutes from "@/services/api/routes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const fetchAuthUser = async () => await apiRoutes.user.auth.profile();

export default function useGetAuthUserQuery({
  ...options
}: {
  retry: boolean;
  enabled?: boolean;
}) {
  return useQuery<AxiosResponse<SafeUser>, AxiosError>({
    queryKey: queryKeys.authUser,
    queryFn: fetchAuthUser,
    staleTime: 1000 * 60 * 60 * 24, // 2 hours
    retry: options.retry,
    enabled: options.enabled,
  });
}
